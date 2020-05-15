const query = require('../queries/cart.query');

class CartService {
  constructor({ db }) {
    this.db = db;
  }

  async addProductToCart({
    productId, saveForLater = true, userId, quantity, amount,
  }) {
    await this.db.none(
      query.addToCart, [userId, saveForLater, productId, quantity, amount],
    );
  }

  async getUserCart(userId) {
    const cart = await this.db.any(query.getUserCart, [userId]);
    return cart;
  }

  async removeFromCart(userId, cartItemId) {
    await this.db.none(query.removeItemFromCart, [userId, cartItemId]);
  }
}

module.exports = CartService;
