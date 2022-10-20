import jwt from 'jsonwebtoken';
require('dotenv').config();

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ message: 'No header provided, User unauthorized' });
  } else {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: 'Forbidden invalid token', error: error  });
      }
      req.email = decoded.email;
      next();
    });
  }
};
