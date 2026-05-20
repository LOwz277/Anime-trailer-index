const mongoose = require('mongoose');

const trailerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, default: 'N/A' }, // Nouveau : Utile pour les musiques
    studio: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Trailer', 'Opening', 'Ending'], // On limite les choix possibles
        default: 'Trailer'
    },
    cover_url: { type: String, required: true },
    youtube_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trailer', trailerSchema);