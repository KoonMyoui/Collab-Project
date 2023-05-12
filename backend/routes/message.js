const express = require('express')
const router = express.Router()

const {
    allMessage,
    sendMessage

} = require('../controllers/message')

const { auth, isAdmin, protect } = require('../middleware/auth')

//@Enpoint  http://localhost:4000/api/opport
//@Method   GET
//@Access   Private
router.get('/message/:chatId', protect, allMessage)
router.post('/message', protect, sendMessage)

module.exports = router