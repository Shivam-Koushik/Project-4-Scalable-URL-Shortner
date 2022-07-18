const mongoose = require('mongoose');

const isValidObjectId = function (x) {
    return mongoose.Types.ObjectId.isValid(x);
}


const isValid = function (x) {
    let strRegex = /^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x != "string" ) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    if (!strRegex.test(x)) return false
    return true
}

const isValidBody = function (y) {
    return Object.keys(y).length > 0
}


module.exports.isValidObjectId = isValidObjectId
module.exports.isValidBody = isValidBody
module.exports.isValid = isValid