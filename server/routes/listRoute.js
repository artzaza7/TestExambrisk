// Set up
const express = require('express')
const router = express.Router()

// call Controller
const listController = require('../controllers/listController')

router.get('/', listController.getAllList)
router.post('/', listController.filterList)

module.exports = router