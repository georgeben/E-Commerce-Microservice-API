const query = require('../queries/orders.query');

class OrderService {
  constructor({ db }) {
    this.db = db;
  }

  async makeOrder({
    userId, orderAmount, shippingAddress, status,
  }) {
    const order = await this.db.one(
      query.createOrder, [userId, orderAmount, shippingAddress, status],
    );
    return order;
  }

  async createShippingAddress({
    address, city, state, country, zipcode,
  }) {
    const shippingAddress = await this.db.one(
      query.createShippingAddress, [address, city, state, country, zipcode],
    );
    return shippingAddress;
  }

  async createOrderItems({
    orderId, productId, quantity, subTotal,
  }) {
    await this.db.none(query.createOrderItem, [orderId, productId, quantity, subTotal]);
  }
}

module.exports = OrderService;
