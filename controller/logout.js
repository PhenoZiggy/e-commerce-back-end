import User from '../models/user';

export const logOutUser = async (req, res) => {
  const cookies = req.cookies;

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
      await User.findByIdAndUpdate(
        { _id: foundUser._id },
        { token: 'loggedOut' },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      )
        .then((response) => {
          res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure true on production
          res.status(200).json({ message: 'Cleared' });
        })
        .catch((error) => {
          res.status(500).json({ message: 'Error while updating the token', error: error });
        });
    } else {
      res.clearCookie('jwt', { httpOnly: true });
      res.status(200).json({ message: 'Cleared , no user found on that Cookie' });
    }
  } else {
    return res.status(200).json({ message: 'Cookie not included, Successfull' });
  }
};
