const Trailer = require('../models/Trailer');

// 1. FETCH ALL ANIME ITEMS (READ)
const getAllTrailers = async (req, res) => {
    try {
        const trailers = await Trailer.find();
        res.status(200).json(trailers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. ADD A NEW ANIME ITEM (CREATE)
const addTrailer = async (req, res) => {
    try {
        const newTrailer = new Trailer(req.body);
        const savedTrailer = await newTrailer.save();
        res.status(201).json(savedTrailer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. UPDATE AN ANIME ITEM (UPDATE)
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

// 4. DELETE AN ANIME ITEM (DELETE)
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

// 5. ADDITIONAL FEATURE: SEARCH BY STUDIO (SEARCH)
const searchByStudio = async (req, res) => {
    try {
        const { studio } = req.query; // Extracts the ?studio parameter from the URL query string
        const trailers = await Trailer.find({ studio: new RegExp(studio, 'i') }); // 'i' flag for case-insensitive matching
        res.status(200).json(trailers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTrailers, addTrailer, updateTrailer, deleteTrailer, searchByStudio };