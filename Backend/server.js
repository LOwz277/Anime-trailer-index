const express = require('express');
const path = require('path');
const connectDB = require('./src/config/db');
const trailerRoutes = require('./src/routes/trailerRoutes');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();

// 1. Core Middlewares
app.use(express.json());
// Serves static files from the frontend directory (one level up from backend)
app.use(express.static(path.join(__dirname, '../frontend')));

// 2. Database Connection
connectDB();

// 3. Swagger JSON Specification
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Anime Media Hub API",
    version: "1.0.0",
    description: "REST API for managing Anime Trailers, Openings, and Endings data",
    contact: {
      name: "Developer Support"
    }
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Development Server"
    }
  ],
  paths: {
    "/api/trailers": {
      "get": {
        "summary": "Retrieve all anime media items",
        "description": "Returns a full list of trailers, openings, and endings stored in MongoDB.",
        "responses": {
          "200": { "description": "Success - Array of items returned" },
          "500": { "description": "Internal Server Error" }
        }
      },
      "post": {
        "summary": "Add a new anime media item",
        "description": "Inserts a new item into the database (Category must be: Trailer, Opening, or Ending).",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["title", "studio", "category", "youtube_id"],
                "properties": {
                  "title": { "type": "string", "example": "Chainsaw Man (OP 1)" },
                  "artist": { "type": "string", "example": "Kenshi Yonezu" },
                  "studio": { "type": "string", "example": "MAPPA" },
                  "category": { "type": "string", "example": "Opening" },
                  "cover_url": { "type": "string", "example": "posters/chainsawman.jpg" },
                  "youtube_id": { "type": "string", "example": "dFlDRhvM4L0" }
                }
              }
            }
          }
        },
        "responses": {
          "201": { "description": "Created Successfully" },
          "400": { "description": "Validation Error / Invalid inputs" },
          "500": { "description": "Internal Server Error" }
        }
      }
    },
    "/api/trailers/{id}": {
      "delete": {
        "summary": "Delete an anime item by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "The MongoDB ObjectId of the item to delete",
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": { "description": "Deleted Successfully" },
          "404": { "description": "Item not found" },
          "500": { "description": "Internal Server Error" }
        }
      }
    }
  }
};

// 4. API Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 5. Application Routes
app.use('/api/trailers', trailerRoutes);

// 6. Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[SERVER] Running properly on port ${PORT}`));