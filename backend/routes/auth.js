const express = require('express')
const router = express.Router()

//controller
const {
    register,
    login,
    listUser,
    currentUser
} = require('../controllers/auth')


//middleware
const { auth, isAdmin } = require('../middleware/auth')

//@Enpoint  http://localhost:3000/api/register
//@Method   POST
//@Access   publish
router.post('/register',register)

//@Enpoint  http://localhost:3000/api/login
//@Method   POST
//@Access   publish
router.post('/login',login)



//@Enpoint  http://localhost:3000/api/auth
//@Method   GET
//@Access   publish
router.get('/auth',listUser)


//@Enpoint  http://localhost:3000/api//current-user
//@Method   POST
//@Access   Private
router.post('/current-user',auth, currentUser)

//@Enpoint  http://localhost:3000/api//current-admin
//@Method   POST
//@Access   Private
router.post('/current-admin', auth, isAdmin, currentUser)

module.exports = router