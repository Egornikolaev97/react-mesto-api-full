const jwt = require('jsonwebtoken');

const JWT_SECRET = '784b2680972d35bb1dd077a6bd6550de2ab89693e9fe59a55665a02fdaa96f7b';

module.exports.jwtSign = (user) => jwt.sign({ _id: user._id }, JWT_SECRET, {
  expiresIn: '7d',
});

module.exports.jwtVerify = (token) => jwt.verify(token, JWT_SECRET);

// const jwt = require('jsonwebtoken');

// const { JWT_SECRET, NODE_ENV } = process.env;

// module.exports.jwtSign = (user) => jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
//   expiresIn: '7d',
// });

// module.exports.jwtVerify = (token) => jwt.verify(token, JWT_SECRET);
