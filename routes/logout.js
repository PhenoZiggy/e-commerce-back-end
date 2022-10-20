import express from 'express';
import { logOutUser } from '../controller/logout';

const router = express.Router();

router.get('/auth/logout', logOutUser);

module.exports = router;
