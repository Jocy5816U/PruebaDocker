const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: String, // Título de la canción
    artist: String, // Artista
    album: String, // Álbum
    genre: String, // Género
    year: Number, // Año de lanzamiento
  },
  { collection: "songs" }
);

const Song = mongoose.model("Song", songSchema);

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.conectarBD();
    this.middlewares();
    this.routes();
    this.listen();
  }

  async conectarBD() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Base de datos conectada");
    } catch (error) {
      console.error("Error al conectar a la base de datos", error);
      process.exit(1);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    // Ruta para obtener todas las canciones
    this.app.get("/songs", async (req, res) => {
      try {
        const songs = await Song.find();
        res.json(songs);
      } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las canciones", error });
      }
    });

    // Ruta para agregar una nueva canción
    this.app.post("/songs", async (req, res) => {
      try {
        const newSong = new Song(req.body);
        await newSong.save();
        res.status(201).json({ mensaje: "Canción creada", song: newSong });
      } catch (error) {
        res.status(400).json({ mensaje: "Error al crear la canción", error });
      }
    });

    // Ruta de prueba
    this.app.get("/", (req, res) => {
      res.json({ mensaje: "Servidor funcionando correctamente" });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://127.0.0.1:${this.port}`);
    });
  }
}

module.exports = Server;
