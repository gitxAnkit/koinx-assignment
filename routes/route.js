import express from 'express';
import { getDeviation, getStats } from '../controllers/controller';

const router = express.Router();

router.route("/stats/:coinId")
    .get(getStats);
router.route("/deviation/:coinId")
    .get(getDeviation)

export default router;