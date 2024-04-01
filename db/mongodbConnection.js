const mongoose = require('mongoose');

const url = process.env.DB_URL

module.exports = () => mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });