import express from 'express';
import { createFeedback, getFeedbacks, deleteFeedback } from '../controllers/feedback.controller.js';

const router = express.Router();

router.get('/', getFeedbacks);
router.post('/', createFeedback);
router.delete('/:id', deleteFeedback);

export default router;
