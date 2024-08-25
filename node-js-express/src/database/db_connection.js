const mongoose = require('mongoose');
require("dotenv").config();
const db_url = process.env.db_url || 5000;

const db_connection = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB Connected!'))
        .catch(err => console.log(err));
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
};

module.exports = db_connection;