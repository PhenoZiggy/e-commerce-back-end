import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and Password Required' });
  const hashedPassWord = await bcrypt.hash(password, 10);

  const duplicateCheck = await User.find({ email: email })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return res.status(500).json({ message: 'Error while searching for a user', error: error });
    });

  if (duplicateCheck.length) {
    res.status(409).json({ message: 'already have a user' });
  } else {
    await User.create({ email: email, password: hashedPassWord, name: name })
      .then((result) => {
        return res.status(200).json({ result });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Error while creating a user', error: error });
      });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and Password Required' });
  const foundUser = await User.find({ email: email })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return res.status(500).json({ message: 'Error while searching for a user', error: error });
    });

  if (foundUser.length === 1) {

    // const matchPassword = await bcrypt.compare(password , foundUser[0])
    console.log(foundUser);
  } else {
    res.status(401).json({ message: 'Already existing user' });
  }
};
