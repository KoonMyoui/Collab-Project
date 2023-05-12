const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message")

exports.allMessage = async(req,res)=>{
    try{
        console.log("allMessage.req.body",req.params.chatId)
        const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "username", User)
        .populate("chat","-__v", Chat);
        console.log("allMessage",messages.length)
        // if (messages.length === 0) {
        //     res.send({status:false, text: 'No Message'})
        // }
        res.json(messages)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.sendMessage = async(req,res)=>{
    try{
        console.log("sendMessage",req.body)
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.sendStatus(400);
        }

        var newMessage = { 
            sender: req.user._id,
            content: content,
            chat: chatId,
        };
        console.log("sendMessage",newMessage)
        var message = await Message.create(newMessage);

        // message = await message.populate("sender", "username")
        // message = await message.populate("chat")
        // message = await User.populate(message, {
        //     path: "chat.users",
        //     select: "username",
        //     model: User
        // });

        // const newMessages = await Message.find({ chat: chatId })
        // .populate("sender", "username", User)
        // .populate("chat","-__v", Chat);
        
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message)

    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}