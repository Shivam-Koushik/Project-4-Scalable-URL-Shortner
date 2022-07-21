const express = require('express');
const router = express.Router(); 
const urlController = require('../controllers/urlController')


router.post('/url/shorten',urlController.postUrl)
router.get('/:urlCode',urlController.getUrl)

router.all("/*", function (req,res) {
    res.status(400).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})


module.exports = router;