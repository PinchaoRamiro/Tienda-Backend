const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
      return next();
  }
  return res.status(403).json({ msg: 'Access denied: admin only' });
};
