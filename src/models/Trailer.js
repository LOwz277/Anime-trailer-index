const mongoose = require('mongoose');

const trailerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    studio: { type: String, required: true },
    cover_url: { type: String, required: true },
    youtube_id: { type: String, required: true }
}, { timestamps: true }); // timestamps ajoute automatiquement la date de création

module.exports = mongoose.model('Trailer', trailerSchema);