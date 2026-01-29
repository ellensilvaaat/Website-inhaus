import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import contactRoutes from './routes/contact.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js'; // ✅ Nova rota

dotenv.config();

const app = express();

// CORS liberado para dev/prod
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rotas
app.use('/api/contact', contactRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/newsletter', newsletterRoutes); // ✅ Nova rota

// Health check
app.get('/', (req, res) => {
  res.send('✅ Inhaus Living API is running fine.');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
