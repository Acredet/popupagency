const express = require('express')
const auth = require('../middleware/auth')

const {
  getStatics
} = require('../controller/statistics')
const router = express.Router()

router
  .route('/', auth)
  .get(getStatics)

module.exports = router
