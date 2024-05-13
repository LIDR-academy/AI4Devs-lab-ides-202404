const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Bearer token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret'); // Fallback for testing
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).send('Invalid token');
  }
};

module.exports = authenticateToken;