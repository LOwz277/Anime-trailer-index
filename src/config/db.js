const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Simulation : Prêt à connecter MongoDB Atlas');
    } catch (error) {
        console.error('Erreur de connexion MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;