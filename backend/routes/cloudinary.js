const express = require('express')
const router = express.Router()

const { isAdmin, protect } = require('../middleware/auth')
const { createImage, removeImage} = require('../controllers/cloundinary')

router.post("/image", protect, createImage);

router.post("/remove-image", protect, removeImage);

module.exports = router