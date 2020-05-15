/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');


const agent = request(app);

describe('Product endpoints', () => {
  it('GET /api/v1', function (done) {
    agent.get('/api/v1')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('message');
        done();
      });
  });
  it('GET /api/v1/products', function (done) {
    agent.get('/api/v1/products')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('message');
        expect(response).to.have.property('data');
        expect(response.data).to.have.property('products');
        expect(response.data.products).to.be.an('array');
        done();
      });
  });

  it('GET /api/v1/products/categories', function (done) {
    agent.get('/api/v1/products/categories')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('message');
        expect(response).to.have.property('data');
        expect(response.data).to.be.an('array');
        done();
      });
  });

  it('GET /api/v1/products/categories/:id', function (done) {
    agent.get('/api/v1/products/categories/1')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('message');
        expect(response).to.have.property('data');
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.property('id');
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('thumbnail');
        done();
      });
  });

  it('GET /api/v1/products/categories/:id - 404', function (done) {
    agent.get('/api/v1/products/categories/11112')
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('error');
        done();
      });
  });

  it('GET /api/v1/products/:id', function (done) {
    agent.get('/api/v1/products/1')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('message');
        expect(response).to.have.property('data');
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.property('id');
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('details');
        expect(response.data).to.have.property('price');
        done();
      });
  });

  it('POST /api/v1/products', function (done) {
    const testProduct = {
      name: 'Laptop',
      details: 'Macbook Pro 2019 13 inch 16 GB RAM 250 SSD',
      categoryId: 1,
      price: 600000,
      amountInStock: 4,
      imageUrl: 'https://apple.com',
    };
    agent.post('/api/v1/products')
      .send(testProduct)
      .set('Content-Type', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('message');
        expect(response).to.have.property('data');
        expect(response.data).to.be.an('object');
        expect(response.data).to.have.property('id');
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('details');
        expect(response.data).to.have.property('price');
        done();
      });
  });

  it('POST /api/v1/products - 400', function (done) {
    const testProduct = {
      name: 'Laptop',
      details: 'Macbook Pro 2019 13 inch 16 GB RAM 250 SSD',
      categoryId: 1,
      price: 'hahaha',
      amountInStock: 4,
      imageUrl: 'https://apple.com',
    };
    agent.post('/api/v1/products')
      .send(testProduct)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        const response = res.body;
        expect(response).to.have.property('error');
        done();
      });
  });
});
