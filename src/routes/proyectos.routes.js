import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get("/proyectos-superior", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM proyectos");
    res.render("proyectos/proyectos-superior", { proyectos: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/proyectos-basico", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM proyectos");
    res.render("proyectos/proyectos-basico", { proyectos: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para ver más detalles de un proyecto
router.get("/ver-mas/:idProyecto", async (req, res) => {
  try {
    const { idProyecto } = req.params;
    const [proyecto] = await pool.query(
      "SELECT * FROM proyectos WHERE idProyecto = ?",
      [idProyecto]
    );
    const proyectoVerMas = proyecto[0];
    res.render("proyectos/ver-mas", { proyectoGrande: proyectoVerMas });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// NUEVA RUTA PARA DESCARGAR EL ARCHIVO
router.get("/download/:idProyecto", async (req, res) => {
  try {
    const { idProyecto } = req.params;
    const [proyecto] = await pool.query(
      "SELECT archivo, nombreArchivo FROM proyectos WHERE idProyecto = ?",
      [idProyecto]
    );

    if (proyecto.length > 0) {
      const archivo = proyecto[0].archivo; // El archivo BLOB
      const nombreArchivo = proyecto[0].nombreArchivo || "archivo.bin"; // Nombre del archivo

      // Establecer cabeceras para la descarga
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${nombreArchivo}"`
      );
      res.setHeader("Content-Type", "application/octet-stream");

      // Enviar el archivo al cliente
      res.send(archivo);
    } else {
      res.status(404).send("Archivo no encontrado");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
