const status = require('http-status');
const { makeInvoker } = require('awilix-express');

function createProductController({ productsService }) {
  return {
    getProduct: async (req, res, next) => {
      const { id } = req.params;
      try {
        const product = await productsService.getProductById(id);
        if (!product) {
          return res.status(status.NOT_FOUND).json(
            { error: 'The product you requested for was not found' },
          );
        }
        return res.status(status.OK).json({
          message: 'Successfully fetched product',
          data: product,
        });
      } catch (error) {
        return next(error);
      }
    },
    getAllProducts: async (req, res, next) => {
      try {
        const products = await productsService.getAllProducts();
        return res.status(status.OK).json({
          message: 'Successfully fetched all products',
          data: {
            products,
            count: products.length,
          },
        });
      } catch (error) {
        return next(error);
      }
    },
    createProduct: async (req, res, next) => {
      try {
        const { body: productData } = req;
        const newProduct = await productsService.createProduct(productData);
        return res.status(status.CREATED).json({
          message: 'Successfully created product',
          data: newProduct,
        });
      } catch (error) {
        return next(error);
      }
    },
    getAllCategories: async (req, res, next) => {
      try {
        const categories = await productsService.getAllCategories();
        return res.status(status.OK).json({
          message: 'Successfully fetched product categories',
          data: categories,
        });
      } catch (error) {
        return next(error);
      }
    },
    getCategory: async (req, res, next) => {
      const { id } = req.params;
      try {
        const category = await productsService.getCategory(id);
        return res.status(status.OK).json({
          message: 'Successfully fetched product categories',
          data: category,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
}

const productController = makeInvoker(createProductController);
module.exports = productController;
