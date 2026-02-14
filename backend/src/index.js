import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import contactRoutes from "./routes/contact.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import adminRoutes from "./routes/admin.routes.js"; 

import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

/*
  🔐 SECURITY HEADERS + CSP (Turnstile liberado)
*/
app.use(helmet());

/*
  📊 LOG HTTP REQUESTS (Morgan → Winston)
*/
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

/*
  🚫 RATE LIMIT GLOBAL
*/
app.use(apiLimiter);

/*
  🔒 CORS
  ⚠️ Quando tiver domínio oficial, troque '*' pelo domínio real
*/
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/*
  📌 ROUTES
*/
app.use("/api/contact", contactRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/newsletter", newsletterRoutes);

/*
  🔐 ADMIN DASHBOARD ROUTES
  👉 GET /admin/security
*/
app.use("/admin", adminRoutes);

/*
  ❤️ HEALTH CHECK
*/
app.get("/", (req, res) => {
  res.send("✅ Inhaus Living API is running fine.");
});

/*
  🚨 GLOBAL ERROR HANDLER
*/
app.use((err, req, res, next) => {
  logger.error("Unhandled server error", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});
