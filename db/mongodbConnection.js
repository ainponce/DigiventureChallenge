const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI

module.exports = () => mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });