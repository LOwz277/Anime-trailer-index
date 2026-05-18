require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Initialisation d'Express
const app = express();

// Middlewares (Obligatoire pour valider le critère JSON du prof)
app.use(cors());
app.use(express.json()); 

// Initialisation de la base de données
connectDB();

// Route de test basique
app.get('/', (req, res) => {
    res.json({ message: "API Anime Trailer Index opérationnelle !" });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});