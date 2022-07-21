const urlModel = require("../models/urlModel")
const Validator = require("../Validator/validation")
const shortid = require('shortid');
const { promisify } = require("util");
const redis = require("redis");
const { url } = require("inspector");

//Connect to redis
const redisClient = redis.createClient(
  17060,
  "redis-17060.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("T8oeQuSIlE1TNffE1tx4DASywDUV7lA5", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});


//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);



const postUrl = async function (req, res) {
  try {
    const body = req.body
    if (!Validator.isValidBody(body)) return res.status(400).send({ status: false, message: " Provide details " })
    const newBody = body.longUrl.trim()
    if (!Validator.isValid(newBody)) return res.status(400).send({ status: false, message: "Enter url" })
    if (!Validator.isValidurl(newBody)) return res.status(400).send({ status: false, message: "Url is not valid" })

    const urlCode = shortid.generate().toLowerCase();
    const obj = {
      "longUrl": body.longUrl,
      "shortUrl": `http://localhost:3000/${urlCode.trim()}`,
      "urlCode": urlCode
    }

    let CahceData = await GET_ASYNC(`${body.longUrl}`)
    if (CahceData) {
      return res.status(200).send({ status: true, data: JSON.parse(CahceData) })
    }

    const findUrl = await urlModel.findOne({ longUrl: body.longUrl })
    if (findUrl) {
      return res.status(200).send({ status: true, data: findUrl })
    }

    const data = await urlModel.create(obj)
    if (data) {
      await SET_ASYNC(`${data.longUrl}`, JSON.stringify(data));
      return res.status(201).send({ status: true, data: data })
    }

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

const getUrl = async function (req, res) {
  try {
    const urlCode = req.params.urlCode
    let cahceData = await GET_ASYNC(`${urlCode}`)

    if (cahceData) {
      return res.redirect(JSON.parse(cahceData).longUrl);
    } else {
      let checkUrl = await urlModel.findOne({ urlCode: urlCode });
      if (!checkUrl) return res.status(404).send({ status: false, message: "No url found" })
      await SET_ASYNC(`${urlCode}`, JSON.stringify(checkUrl))
      return res.redirect(checkUrl.longUrl);
    }


  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


module.exports.postUrl = postUrl
module.exports.getUrl = getUrl