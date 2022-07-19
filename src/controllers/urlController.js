const urlModel = require("../models/urlModel")
const Validator = require("../Validator/validation")
const shortid = require('shortid');
const validUrl = require('valid-url');



const postUrl = async function (req, res) {
  try {
    const body = req.body
    if (!Validator.isValidBody(body)) return res.status(400).send({ status: false, message: " Provide details " })
    const newBody = body.longUrl.trim()
    if (!Validator.isValid(newBody)) return res.status(400).send({ status: false, message: "Enter url" })
    if (!Validator.isValidurl(newBody)) return res.status(400).send({ status: false, message: "Url is not valid" })

    const urlCode = shortid.generate(newBody);
    const obj = {
      "longUrl": body.longUrl,
      "shortUrl": `http://localhost:3000/${urlCode.toLowerCase().trim()}`,
      "urlCode": urlCode
    }

    const findUrl = await urlModel.findOne({ longUrl: body.longUrl })
    if (findUrl) return res.status(200).send({ status: true, data: findUrl })

    const data = await urlModel.create(obj)
    return res.status(201).send({ status: true, data: data })

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

const getUrl = async function (req, res) {
  try {

    const urlCode = req.params.urlCode
    let checkUrl = await urlModel.findOne({ urlCode: urlCode })
    if (checkUrl) {
      return res.status(302).redirect(checkUrl.longUrl);
    } else {
      return res.status(404).send({ status: false,message: "No url found"})
    }

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


module.exports.postUrl = postUrl
module.exports.getUrl = getUrl