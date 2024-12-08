const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://gamegrid:de1DHPsgf3uZA8Sc@gamegridcluster.ouovw.mongodb.net/?retryWrites=true&w=majority&appName=GameGridCluster', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB at 127.0.0.1');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};

module.exports = { connect };