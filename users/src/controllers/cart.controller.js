const status = require('http-status');
const { makeInvoker } = require('awilix-express');

function createCartController({ cartService, axios, PRODUCT_SERVICE_URL }) {
  return {
    addToCart: async (req, res, next) => {
      try {
        const { productId } = req.body;
        const userId = req.user.id;

        // Get product information from product service
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/v1/products/${productId}`);
        const product = response.data.data;
        if (!product) {
          return res.status(status.NOT_FOUND).json({
            error: 'The product you specified was not found',
          });
        }
        const { quantity, saveForLater } = req.body;
        const amount = quantity * Number(product.price);
        const cartData = {
          productId: product.id,
          saveForLater,
          userId,
          quantity,
          amount,
        };
        await cartService.addProductToCart(cartData);
        const userCart = await cartService.getUserCart(userId);
        return res.status(status.OK).json({
          message: 'Successfully added item to cart',
          data: userCart,
        });
      } catch (error) {
        if (error.response) {
          // The error is from product service
          return res.status(error.response.status).json(error.response.data);
        }
        return next(error);
      }
    },
    getCart: async (req, res, next) => {
      const userId = req.user.id;
      try {
        const userCart = await cartService.getUserCart(userId);
        return res.status(status.OK).json({
          message: 'Successfully fetched user cart',
          data: userCart,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
}

const cartController = makeInvoker(createCartController);
module.exports = cartController;
