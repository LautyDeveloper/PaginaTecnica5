import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Rutas existentes
router.get("/nosotros", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipodirectivo");
    res.render("nosotros/nosotros", { equipo: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
