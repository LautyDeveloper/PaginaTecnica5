import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Rutas existentes
router.get("/previas", async (req, res) => {
  res.render("alumnos/previas");
});
router.get("/intensificacion", async (req, res) => {
  res.render("alumnos/intensificacion");
});


export default router;