const express = require('express');
const connectDB = require('./src/config/db');
const trailerRoutes = require('./src/routes/trailerRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();

// Connexion Base de données
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Configuration Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Anime Media Hub API',
            version: '1.0.0',
            description: 'API pour gérer les trailers, openings et endings d animes',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Va chercher la doc dans les fichiers de routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/trailers', trailerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));