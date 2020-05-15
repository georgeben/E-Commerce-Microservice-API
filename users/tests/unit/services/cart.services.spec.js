const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const CartService = require('../../../src/services/cart.services');
const { cart } = require('../../mocks');

chai.use(chaiAsPromised);

const { expect } = chai;

describe('cart.services.js', () => {
  it('addProductToCart', () => {
    const db = {
      none: () => Promise.resolve(),
    };
    const cartService = new CartService({ db });
    return expect(cartService.addProductToCart(1, true, 2, 1, 3000)).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.equal(undefined);
      });
  });

  it('getUserCart', () => {
    const db = {
      any: () => cart,
    };
    const cartService = new CartService({ db });
    return expect(cartService.getUserCart(1)).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.be.an('array');
        expect(res[0]).to.deep.equal(cart[0]);
      });
  });

  it('removeFromCart', () => {
    const db = {
      none: () => Promise.resolve(),
    };
    const cartService = new CartService({ db });
    return expect(cartService.addProductToCart(1, 13)).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.equal(undefined);
      });
  });
});
