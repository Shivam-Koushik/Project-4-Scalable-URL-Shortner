const mongoose = require('mongoose');

const isValidObjectId = function (x) {
    return mongoose.Types.ObjectId.isValid(x);
}
const isValidurl = function (x) {
    const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
     if(url.test(x)) return true
}


const isValid = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x != "string" ) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true
}

const isValidBody = function (y) {
    return Object.keys(y).length > 0
}


module.exports.isValidObjectId = isValidObjectId
module.exports.isValidBody = isValidBody
module.exports.isValid = isValid
module.exports.isValidurl = isValidurl