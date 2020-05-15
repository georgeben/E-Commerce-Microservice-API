const query = require('../queries/orders.query');
const { ORDER_STATUSES } = require('../util/constants');

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

  async cancelOrder(userId, orderId) {
    const result = await this.db.oneOrNone(query.cancelOrder, [ORDER_STATUSES.cancelled, userId, orderId]);
    return result;
  }
}

module.exports = OrderService;
