const express = require('express')
const router = express.Router()

const { 
    getAllOpport,
    createOpport,
    getOpportById,
    updateOpport,
    removeOpport,
    getAllOpportById,
    changeOpportJoin,
    changeOpportStatus

} = require('../controllers/opport')

const { auth, isAdmin, protect } = require('../middleware/auth')

//@Enpoint  http://localhost:4000/api/opport
//@Method   GET
//@Access   Private
router.get('/opport', getAllOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   GET
//@Access   Private
router.get('/opport/:id', getOpportById)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   GET
//@Access   Private
router.get('/opport/me/:id',protect, getAllOpportById)

//@Enpoint  http://localhost:4000/api/opport
//@Method   POST
//@Access   Private
router.post('/opport',auth, createOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   PUT
//@Access   Private
router.put('/opport/:id',protect , updateOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   DELETE
//@Access   Private
router.delete('/opport/:id',protect , removeOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   PUT
//@Access   Private
router.put('/opport/change-status/:id',protect , changeOpportStatus)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   PUT
//@Access   Private
router.put('/opport/change-isJoin/:id',protect , changeOpportJoin)
module.exports = router