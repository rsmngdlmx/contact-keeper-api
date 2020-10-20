const jwt = require('jsonwebtoken');
const config = require('config');

const createToken = userId => {
  const payload = { user: { id: userId } };
  const options = { expiresIn: 360000 };

  return jwt.sign(payload, config.get('jwtSecret'), options, (err, token) => {
    if (err) throw err;
    return token;
  });
};

module.exports = { createToken };
