import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import commentsRoutes from './routes/comments.routes.js';

dotenv.config();

const app = express();

// ✅ CORS configurado corretamente (Render + Vercel + local dev)
app.use(cors({
  origin: [
    'https://website-inhaus.vercel.app', // produção (Vercel)
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
  ],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rotas principais
app.use('/api/contact', contactRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/comments', commentsRoutes);

// Rota raiz opcional (teste rápido)
app.get('/', (req, res) => {
  res.send('✅ Inhaus Living API is running fine.');
});

// Porta padrão
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



