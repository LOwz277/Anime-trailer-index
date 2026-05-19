const Trailer = require('../models/Trailer');

// 1. LIRE TOUS LES ANIMES (READ)
const getAllTrailers = async (req, res) => {
    try {
        const trailers = await Trailer.find();
        res.status(200).json(trailers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. AJOUTER UN ANIME (CREATE)
const addTrailer = async (req, res) => {
    try {
        const newTrailer = new Trailer(req.body);
        const savedTrailer = await newTrailer.save();
        res.status(201).json(savedTrailer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. MODIFIER UN ANIME (UPDATE)
const updateTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Trailer.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Anime introuvable" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. SUPPRIMER UN ANIME (DELETE)
const deleteTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Trailer.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Anime introuvable" });
        res.status(200).json({ message: "Trailer supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. FONCTIONNALITÉ SUPPLÉMENTAIRE : RECHERCHE PAR STUDIO (SEARCH)
const searchByStudio = async (req, res) => {
    try {
        const { studio } = req.query; // Récupère le paramètre ?studio=Nom du studio dans l'URL
        const trailers = await Trailer.find({ studio: new RegExp(studio, 'i') }); // 'i' pour ignorer les majuscules/minuscules
        res.status(200).json(trailers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTrailers, addTrailer, updateTrailer, deleteTrailer, searchByStudio };