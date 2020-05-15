const status = require('http-status');
const { makeInvoker } = require('awilix-express');
const { ORDER_STATUSES } = require('../util/constants');

function createOrdersController({ ordersService, axios, PRODUCT_SERVICE_URL }) {
  return {
    makeOrder: async (req, res, next) => {
      const { products, shippingAddress } = req.body;
      const userId = req.user.id;
      try {
        // Verify that the products exist
        const promises = products.map((item) => axios.get(`${PRODUCT_SERVICE_URL}/api/v1/products/${item.id}`));
        const result = await Promise.all(promises);
        const orderedProducts = result.map((item) => item.data.data);

        for (let i = 0; i < products.length; i += 1) {
          const cur = products[i];
          const productData = orderedProducts.find((item) => item.id === cur.id);
          cur.productData = productData;
          const subTotal = cur.quantity * Number(productData.price);
          cur.subTotal = subTotal;
        }

        const orderAmount = products.reduce((prev, current) => prev + current.subTotal, 0);

        const orderAddress = await ordersService.createShippingAddress(shippingAddress);

        // Create an order
        const orderData = {
          userId,
          orderAmount,
          shippingAddress: orderAddress.id,
          status: ORDER_STATUSES.scheduled,
        };
        const order = await ordersService.makeOrder(orderData);

        const orderItemPromises = products.map((item) => (ordersService.createOrderItems({
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          subTotal: item.subTotal,
        })));
        await Promise.all(orderItemPromises);

        return res.status(status.CREATED).json({
          message: 'Successfully placed order',
        });
      } catch (error) {
        if (error.response) {
          // The error is from product service
          return res.status(error.response.status).json(error.response.data);
        }
        return next(error);
      }
    },
  };
}

const ordersController = makeInvoker(createOrdersController);
module.exports = ordersController;
