const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    
    longUrl: {
        type: String,
        trim:true,
        required:true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    urlCode: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    }
 
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema)