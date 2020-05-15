const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const UserService = require('../../../src/services/users.services');

const { user } = require('../../mocks');

chai.use(chaiAsPromised);

const { expect } = chai;

describe('users.services.js', () => {
  it('getUserById', () => {
    const db = {
      oneOrNone: () => user,
    };
    const userService = new UserService({ db });
    return expect(userService.getUserById(1)).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.deep.equal(user);
      });
  });

  it('getUserByEmail', () => {
    const db = {
      oneOrNone: () => user,
    };
    const userService = new UserService({ db });
    return expect(userService.getUserByEmail('test@email.com')).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.deep.equal(user);
      });
  });

  it('createUser', () => {
    const result = {
      first_name: 'John',
      last_name: 'Wick',
      email: 'john@wick.com',
    };
    const db = {
      one: () => result,
    };
    const userService = new UserService({ db });
    return expect(userService.createUser('John', 'Wick', 'john@wick.com', 'password', '0808111222')).to.eventually.be.fulfilled
      .then((res) => {
        expect(res).to.deep.equal(result);
      });
  });
});
