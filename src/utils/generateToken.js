const jwt = require('jsonwebtoken');

const generateToken = (id, role, email) => {
  return jwt.sign(
    { id, role, email }, process.env.JWT_SECRET, { expiresIn: '30d', }
  );
};

module.exports = generateToken;