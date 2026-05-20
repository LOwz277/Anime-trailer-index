# 🎬 Anime Media Hub - Full-Stack Application

Anime Media Hub is a sleek, modern, and fully responsive full-stack web application designed to catalog and stream anime trailers, openings, and endings. The project features an interactive video streaming grid inspired by premium platforms, instant client-side search, database integration, and a fully documented REST API.

---

## 🚀 Key Features

* **Dynamic Widescreen Grid:** High-performance display rendering exactly 4 cinematic cards per row on desktop, automatically scaling down to 2 or 1 column on mobile devices.
* **Instant Multi-Criteria Search:** Client-side real-time filtering that simultaneously scans through Anime Titles, Animation Studios, and Music Artists without redundant API calls.
* **Tab-Based Category Filtering:** Smooth transitions to isolate and display only Trailers, Openings, or Endings.
* **Interactive API Documentation:** Full interactive OpenAPI/Swagger specification accessible directly via the browser to test backend endpoints.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (via Mongoose ODM)
* **API Documentation:** Swagger UI Express
* **Frontend:** Semantic HTML5, Advanced CSS3 (Grid, Flexbox, custom design tokens), Vanilla JavaScript (ES6+ async/await fetch architecture)

---

## 📦 Installation & Local Setup

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) and an active [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster ready.

### 2. Setup and Dependencies
Navigate into the `backend` directory and install the required modules:
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file inside the `backend/` directory and add your configurations:
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
```

### 4. Launch the Application
Start the local development server from the backend folder:
```bash
npm start
```
*The application will successfully bind and run on `http://localhost:3000`*

---

## 🗺️ API Architecture & Documentation

### Interactive Docs Route
* **`GET /api-docs`** - Live interactive Swagger user interface containing explicit schemas and execution testing capabilities.

### REST Endpoints
* **`GET /api/trailers`** - Fetches the full list of compiled media assets from the MongoDB collection.
* **`POST /api/trailers`** - Inserts a validated new media item into the database.
* **`DELETE /api/trailers/:id`** - Permanently removes a targeted item using its unique MongoDB `ObjectId`.

---

## 📂 Project Structure

```text
├── frontend/
│   ├── posters/          # Locally hosted official anime covers
│   ├── app.js            # Frontend logic (Search, Filters, DOM injection)
│   ├── index.html        # Main interface skeleton
│   ├── style.css         # Custom layout definitions & responsive queries
│   └── hero-bg.jpg       # Hero section cinematic background image
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js     # MongoDB connection lifecycle management
│   │   ├── models/
│   │   │   └── Trailer.js # Mongoose Schema mapping
│   │   └── routes/
│   │       └── trailerRoutes.js # REST API endpoint routing definitions
│   ├── .env              # Environment secrets (ignored by Git)
│   ├── package.json      # Project metadata and dependency management
│   └── server.js         # Application entry point & Swagger config
└── README.md             # Main repository documentation (Root level)
```