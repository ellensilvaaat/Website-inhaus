import express from 'express';
import { getComments, addComment, deleteComment,  getAllComments } from '../controllers/comments.controller.js';

const router = express.Router();

router.get('/', getAllComments); // comentários de um post
router.get('/:slug', getComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);

export default router;

