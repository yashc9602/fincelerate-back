const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => { // Use the same secret key
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyAuth;
