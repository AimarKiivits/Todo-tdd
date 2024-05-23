const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
        });
    } catch (error) {
        console.error('Error connecting to mongodb');
        console.error(error);
    }
}

module.exports = { connect };