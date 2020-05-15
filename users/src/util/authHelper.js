const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function generatePasswordHash(password, saltRounds = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
        return;
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(hash);
      });
    });
  });
}

/**
 * Compares the plain text password with the hashed password for a match
 * @param  {string} password Plain text password
 * @param  {string} hash     Hashed password
 * @return {Promise} Resolves to a boolean value indicating if passwords match
 */
async function comparePassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
}

function signJWTToken(payload) {
  const options = {
    expiresIn: '30d',
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

function decodeJWTToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = {
  generatePasswordHash,
  comparePassword,
  signJWTToken,
  decodeJWTToken,
};
