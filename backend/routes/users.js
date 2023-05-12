const express = require('express')
const router = express.Router()

//controller
const { 
    allUser,
    readUser,
    updateUser,
    removeUser,
    changeRole,
    changeStatus,
    searchUser
 } = require('../controllers/users')

//middleware
const { auth, isAdmin } = require('../middleware/auth')

//@Enpoint  http://localhost:4000/api/users
//@Method   GET
//@Access   Private
router.get('/users',auth,isAdmin, allUser)

//@Enpoint  http://localhost:4000/api/search
//@Method   GET
//@Access   Public
router.get('/search', searchUser)

//@Enpoint  http://localhost:4000/api/users/:id
//@Method   GET
//@Access   Private
router.get('/users/:id', readUser)

//@Enpoint  http://localhost:4000/api/users/:id
//@Method   PUT
//@Access   Private
router.put('/users/:id',auth,isAdmin, updateUser)

//@Enpoint  http://localhost:4000/api/users/:id
//@Method   DELETE
//@Access   Private
router.delete('/users/:id', removeUser)


//@Enpoint  http://localhost:4000/api/change-role
//@Method   POST
//@Access   Private
router.post('/change-role',auth,isAdmin, changeRole)

//@Enpoint  http://localhost:4000/api/change-status
//@Method   POST
//@Access   Private
router.post('/change-status',auth,isAdmin, changeStatus)

module.exports = router