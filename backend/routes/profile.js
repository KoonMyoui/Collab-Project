const express = require('express')
const router = express.Router()

const { protect, isAdmin } = require('../middleware/auth')
const { createProfile, updateProfile } = require('../controllers/profile')

//@Enpoint  http://localhost:4000/api/opport
//@Method   POST
//@Access   Private
router.post('/createProfile',protect , createProfile)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   PUT
//@Access   Private
router.put('/profile/:id',protect , updateProfile)

module.exports = router