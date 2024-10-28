import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Rutas existentes
router.get("/profesores", async (req, res) => {
  res.render("profesores/profesores");
});

export default router;