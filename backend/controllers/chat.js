const Chat = require("../models/Chat");
const User = require("../models/User");

//Create or fetch One to One Chat
exports.accessChat = async(req,res)=>{
    const { userId } = req.body;
    console.log(userId)
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },

        ],
    })
    .populate("users", "-password")
    .populate("latestMassage")

    isChat = await User.populate(isChat, {
        path: "latestMassage.sender",
        select: "username"
    })

    if (isChat.length > 0){
        res.send(isChat[0])
    }else{
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }

        try{
            const creatChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id: creatChat._id}).populate(
                "users",
                "-password"
            )
            res.status(200).json(FullChat)

        }catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    }

}

exports.fetchChats = async(req,res)=>{
    try{
        Chat.find({ users: {$elemMatch: { $eq: req.user._id} } })
        // .populate("users", "-password")
        // .populate("groupAdmin", "-password")
        // .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMassage.sender",
                select: "username"
            });
            console.log(results,'554545454545454545')
            if(results.length > 0){
                res.send(results);
            }else{
                res.send('No chat for me')
            }
            
        })

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.createGroupChat = async(req,res)=>{

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);
    users.push(req.user);
    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
            projectID: req.body.projectID,
          });

          const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        //   const fullGroupChat2 = await Chat.find
        //   .populate("users", "-password")
        //   .populate("groupAdmin", "-password");
    
        res.status(200).json(fullGroupChat);
        

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.renameGroup = async(req,res)=>{
    try{
        
        const {chatId, chatName } = req.body

        const updateChat = await Chat.findByIdAndUpdate(
            chatId, {chatName: chatName}, {new: true}
        )
        // .populate("users", "-password")
        // .populate("groupAdmin", "-password");

        if (!updateChat){
            res.status(404).send('Chat not found')
        }else {
            res.json(updateChat)
        }

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.removeFromGroup = async(req,res)=>{
    try{
        
        const {chatId, userId } = req.body

        //check if requester is admin

        const removeUser = await Chat.findByIdAndUpdate(
            chatId, 
            {
                $pull: { users: userId }
            }, 
            {new: true}
        )
        // .populate("users", "-password")
        // .populate("groupAdmin", "-password");

        if (!removeUser){
            res.status(404).send('Chat not found')
        }else {
            res.json(removeUser)
        }

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.addToGroup = async(req,res)=>{
    try{
        const {chatId, userId } = req.body
        //check if requester is admin

        const addUser = await Chat.findByIdAndUpdate(
            chatId, 
            {
                $push: { users: userId }
            }, 
            {new: true}
        )
        // .populate("users", "-password")
        // .populate("groupAdmin", "-password");

        if (!addUser){
            res.status(404).send('Chat not found')
        }else {
            res.json(addUser)
        }

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.addToOrCreateGroup = async(req,res)=>{
    try{
        const {chatId, userId } = req.body
        //check if requester is admin

        const addUser = await Chat.findByIdAndUpdate(
            chatId, 
            {
                $push: { users: userId }
            }, 
            {new: true}
        )
        // .populate("users", "-password")
        // .populate("groupAdmin", "-password");

        if (!addUser){
            res.status(404).send('Chat not found')
        }else {
            res.json(addUser)
        }

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.createNewGroupChat = async(req,res)=>{

    if (!req.body.title) {
        return res.status(400).send({ message: "no title for chat name" });
    }

    // var users = JSON.parse(req.body.users);
    // users.push(req.user);
    try{
        const groupChat = await Chat.create({
            chatName: req.body.title,
            users: [req.user._id],
            isGroupChat: true,
            groupAdmin: req.user,
            projectID: req.body._id,
          });

        //   const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        // //   const fullGroupChat2 = await Chat.find
        // //   .populate("users", "-password")
        // //   .populate("groupAdmin", "-password");
    
        // res.status(200).json(fullGroupChat);
        

        console.log('#createNewGroupChat',req.body)
        res.send('create group chat success')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}