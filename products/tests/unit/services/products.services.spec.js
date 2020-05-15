const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const ProductService = require('../../../src/services/products.services');
const { testCategory } = require('../../mocks');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('products.services.js', () => {
  const testProduct = {
    id: 2,
    name: 'Shoe',
    details:
      'Awesome description',
    category_id: 1,
    price: 7000.00,
    amount_in_stock: 10,
    image_url:
      'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/221754/1.jpg?8464',
    created_at: '2020-05-15T11:07:00.397Z',
    updated_at: '2020-05-15T11:07:00.397Z',
    category_name: 'Electronics',
  };

  it('getProductById', () => {
    const db = {
      oneOrNone: () => testProduct,
    };
    const productService = new ProductService({ db });
    return expect(productService.getProductById()).to.eventually.be.fulfilled
      .then((result) => {
        expect(result).to.deep.equal(testProduct);
      });
  });

  it('getAllProducts', () => {
    const db = {
      any: () => [testProduct],
    };
    const productService = new ProductService({ db });
    return expect(productService.getAllProducts()).to.eventually.be.fulfilled
      .then((result) => {
        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal(testProduct);
      });
  });

  it('createProduct', () => {
    const db = {
      one: (query, data) => {
        const result = {
          name: data[0],
          details: data[1],
          categoryId: data[2],
          price: data[3],
          amountInStock: data[4],
          imageUrl: data[5],
        };
        return result;
      },
    };
    const productService = new ProductService({ db });
    const data = {
      name: 'Bag',
      details: 'Some details',
      categoryId: 44,
      price: 20000,
      amountInStock: 10,
      imageUrl: 'http://animmage.com',
    };
    return expect(productService.createProduct(data)).to.eventually.be.fulfilled
      .then((result) => {
        expect(result).to.deep.equal(data);
      });
  });

  it('getAllCategories', () => {
    const db = {
      any: () => [testCategory],
    };
    const productService = new ProductService({ db });
    return expect(productService.getAllCategories()).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.be.an('array');
        expect(res[0]).to.deep.equal(testCategory);
      });
  });

  it('getCategory', () => {
    const db = {
      oneOrNone: () => testCategory,
    };
    const productService = new ProductService({ db });
    return expect(productService.getCategory(1)).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.deep.equal(testCategory);
      });
  });
});
