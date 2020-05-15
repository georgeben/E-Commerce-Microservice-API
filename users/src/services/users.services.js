const query = require('../queries/users.query');

class UsersService {
  constructor({ db }) {
    this.db = db;
  }

  async getUserById(id) {
    const user = await this.db.oneOrNone(query.getUserById, [id]);
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.db.oneOrNone(query.getUserByEmail, [email]);
    return user;
  }

  async createUser(firstName, lastName, email, password, phoneNo) {
    const createdUser = await this.db.one(
      query.createUser, [firstName, lastName, email, password, phoneNo],
    );
    return createdUser;
  }
}

module.exports = UsersService;
