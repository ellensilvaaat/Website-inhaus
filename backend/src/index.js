import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import commentsRoutes from './routes/comments.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/comments', commentsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


