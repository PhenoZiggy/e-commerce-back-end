import express from 'express';
import { registerUser, loginUser } from '../controller/user';

const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

module.exports = router;
