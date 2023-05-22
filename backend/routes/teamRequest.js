const express = require('express')
const router = express.Router()

const { 
    createTeamRequest,
    allMeRequest,
    MeRequested,
    CheckRequested,
    acceptToGroup,
    MeSentRequested,
    removeRequest
} = require('../controllers/teamRequest')

const { auth, isAdmin, protect } = require('../middleware/auth')

//@Enpoint  http://localhost:4000/api/join-project/request
//@Method   POST
//@Access   Private
router.post('/join-project/request', protect, createTeamRequest)

router.get('/join-project/me-request',protect, allMeRequest)

router.get('/join-project/me-request/:uid',protect, MeRequested)
router.get('/join-project/me-sent-request/:uid',protect, MeSentRequested)
router.post('/join-project/requested',protect, CheckRequested)
router.post('/join-project/accept',protect, acceptToGroup)

router.delete('/join-project/cancel-request/:id',protect, removeRequest)

module.exports = router