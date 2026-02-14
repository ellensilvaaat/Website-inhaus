import express from "express";
import jwt from "jsonwebtoken";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { getSecurityStats } from "../controllers/admin.controller.js";

const router = express.Router();

/*
  🔑 ROTA TEMPORÁRIA — GERAR TOKEN ADMIN
  ⚠️ REMOVER EM PRODUÇÃO
*/
router.get("/token", (req, res) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "JWT_SECRET not configured",
    });
  }

  const token = jwt.sign(
    {
      role: "admin",
      email: "ellensilvaeng@gmail.com",
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    success: true,
    token,
  });
});

/*
  📊 DASHBOARD DE SEGURANÇA (PROTEGIDO)
  GET /admin/security
*/
router.get("/security", verifyAdmin, getSecurityStats);

/*
  ❤️ ROTA SIMPLES PARA TESTE
*/
router.get("/ping", (req, res) => {
  res.json({ success: true, message: "Admin routes working" });
});

export default router;

