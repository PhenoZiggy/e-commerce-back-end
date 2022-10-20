import express from 'express';
import { test } from '../controller/test';
import { verifyJWT } from '../middleware/verifyJWT';

const router = express.Router();

router.post('/auth/test', verifyJWT, test);

module.exports = router;
