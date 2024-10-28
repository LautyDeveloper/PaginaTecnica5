import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Rutas existentes
router.get("/nosotros", async (req, res) => {
  res.render("nosotros/nosotros");
});

export default router;