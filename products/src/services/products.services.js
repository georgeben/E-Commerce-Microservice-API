const queries = require('../queries/products.query');

class ProductsService {
  constructor({ db }) {
    this.db = db;
  }

  async getProductById(id) {
    const product = await this.db.oneOrNone(queries.getProductById, [id]);
    return product;
  }

  async getAllProducts() {
    const products = await this.db.any(queries.getAllProducts);
    return products;
  }

  async createProduct({
    name, details, categoryId, price, amountInStock, imageUrl,
  }) {
    const createdProduct = await this.db.one(
      queries.createProduct, [name, details, categoryId, price, amountInStock, imageUrl],
    );
    return createdProduct;
  }
}

module.exports = ProductsService;
