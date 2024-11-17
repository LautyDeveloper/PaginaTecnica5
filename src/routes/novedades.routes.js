import { Router } from "express";
import pool from "../database.js";

const router = Router();
router.get("/noticia/:idNovedad", async (req, res) => {
  try {
    const { idNovedad } = req.params;
    const [novedad] = await pool.query(
      "SELECT * FROM novedades WHERE idNovedad = ?",
      [idNovedad]
    );
    const novedadVerMas = novedad[0];
    res.render("novedades/noticia", { novedadGrande: novedadVerMas });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
