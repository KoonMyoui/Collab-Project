const express = require('express')
const router = express.Router()

const { 
    getAllOpport,
    createOpport,
    getOpportById,
    updateOpport,
    removeOpport

} = require('../controllers/opport')

const { auth, isAdmin } = require('../middleware/auth')

//@Enpoint  http://localhost:4000/api/opport
//@Method   GET
//@Access   Private
router.get('/opport', getAllOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   GET
//@Access   Private
router.get('/opport/:id', getOpportById)

//@Enpoint  http://localhost:4000/api/opport
//@Method   POST
//@Access   Private
router.post('/opport',auth, createOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   PUT
//@Access   Private
router.put('/opport/:id',auth , updateOpport)

//@Enpoint  http://localhost:4000/api/opport/:id
//@Method   DELETE
//@Access   Private
router.delete('/opport/:id',auth , removeOpport)

module.exports = router