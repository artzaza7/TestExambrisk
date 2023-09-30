// Set up
const express = require('express')
const router = express.Router()

// call Controller
const listController = require('../controllers/listController')

router.get('/', listController.getAllLists)
// router.post('/', listController.getAllLists)

module.exports = router