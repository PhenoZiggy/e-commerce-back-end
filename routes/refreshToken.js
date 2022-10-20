import express from 'express';
import { refreshToken } from '../controller/refreshToken';

const router = express.Router();

router.get('/auth/refresh', refreshToken);

module.exports = router;
