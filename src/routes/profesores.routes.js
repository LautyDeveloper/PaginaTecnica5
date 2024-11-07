import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Rutas existentes
router.get("/profesores", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM noticiasprofesores");
    res.render("profesores/profesores", { noticias: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
