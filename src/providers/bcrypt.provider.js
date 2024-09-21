require('dotenv').config();
const bcrypt = require('bcrypt');
module.exports =  {
  compare: (plain, hash) => {
    return bcrypt.compare(plain, hash)
  },
  hash: (plain) => {
    const SALT_ROUND = typeof process.env.BCRYPT_SALT_ROUNDS == 'string' ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : process.env.BCRYPT_SALT_ROUNDS
    return bcrypt.hash(plain, SALT_ROUND)
  }
}