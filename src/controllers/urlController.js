const urlModel = require("../models/urlModel")
const Validator = require("../Validator/validation")


const postUrl = async function (req, res) {
  try {
   

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
const getUrl = async function (req, res) {
  try {
   

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


module.exports.postUrl = postUrl  
module.exports.getUrl = getUrl  