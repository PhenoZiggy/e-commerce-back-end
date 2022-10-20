import User from '../models/user';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) return res.status(401).json({ message: 'Cookie not found' });

  if (cookies.jwt) {
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Error while searching for a user Token', error: error });
      });

    if (foundUser) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error || foundUser.email !== decoded.email) {
          return res.status(403).json({ message: 'refreshtoken error', error: error });
        } else {
          const accessToken = jwt.sign(
            {
              mail: decoded.mail,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '30s',
            }
          );
          res.status(200).json({ accessToken });
        }
      });
    } else {
      res.status(403).json({ message: 'Access forbidden!, token invalid' });
    }
  }
};
