import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Rutas existentes
router.get("/informatica", async (req, res) => {
  res.render("carreras/informatica/informatica");
});
router.get("/programacion", async (req, res) => {
  res.render("carreras/programacion/programacion");
});
router.get("/mmo", async (req, res) => {
  res.render("carreras/mmo/mmo");
});

export default router;