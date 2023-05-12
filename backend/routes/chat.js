const express = require('express')
const router = express.Router()

const { auth, isAdmin, protect } = require('../middleware/auth')

//controller
const { accessChat,
        fetchChats,
        createGroupChat,
        createNewGroupChat,
        renameGroup,
        removeFromGroup,
        addToGroup
 } = require('../controllers/chat')

//@Enpoint  http://localhost:4000/api/chat
//@Method   POST
//@Access   Private
router.post('/chat', protect, accessChat)
router.get('/chat',protect, fetchChats);
router.put('/chat/rename',protect , renameGroup);

router.post('/chat/group',protect , createGroupChat);
router.post('/chat/group/new-group',protect , createNewGroupChat);
router.put('/chat/group/remove-user',protect , removeFromGroup);
router.put('/chat/group/add-user',protect , addToGroup);

module.exports = router