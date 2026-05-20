const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Cette fois, on se connecte pour de vrai !
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Atlas connecté avec succès sur : ${conn.connection.host}`);
    } catch (error) {
        console.error('Erreur fatale de connexion MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;