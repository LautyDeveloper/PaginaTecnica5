import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import pool from "./database.js";
import carrerasRoutes from "./routes/carreras.routes.js";
import proyectosRoutes from "./routes/proyectos.routes.js"
import alumnosRoutes from "./routes/alumnos.routes.js"
import profesoresRoutes from "./routes/profesores.routes.js"
import nosotrosRoutes from "./routes/nosotros.routes.js"
import hbs from "handlebars";

//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM novedades");
    const [result2] = await pool.query("SELECT * FROM novedades ORDER BY id DESC LIMIT 4");

    res.render("index", {consultas: [result, result2]});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.render("index");
});

//Public files
app.use(express.static(join(__dirname, "public")));
app.use(carrerasRoutes);
app.use(proyectosRoutes);
app.use(alumnosRoutes);
app.use(profesoresRoutes);
app.use(nosotrosRoutes);

// Registro del helper
hbs.registerHelper("eq", (a, b) => {
  return a === b;
});

//Run Server
app.listen(app.get("port"), () =>
  console.log("Server listening on the port", app.get("port"))
);
