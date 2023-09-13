const express = require('express')
const {handleGetRequest} = require('../controllers/mainController')
const router = express.Router()

router.get('/:word',handleGetRequest)

module.exports = router
