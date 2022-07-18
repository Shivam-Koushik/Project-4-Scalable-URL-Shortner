const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
 
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema)