const express = require('express');
const router = express.Router();
const { 
    getAllTrailers, 
    addTrailer, 
    updateTrailer, 
    deleteTrailer, 
    searchByStudio 
} = require('../controllers/trailerController');

// Routes principales de l'API
router.get('/', getAllTrailers);
router.post('/', addTrailer);
router.get('/search', searchByStudio); // URL sera : /api/trailers/search?studio=Pierrot
router.put('/:id', updateTrailer);      // URL sera : /api/trailers/ID_DE_L_ANIME
router.delete('/:id', deleteTrailer);   // URL sera : /api/trailers/ID_DE_L_ANIME

module.exports = router;