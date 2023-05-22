const Chat = require("../models/Chat");
const TeamRequest = require("../models/TeamRequest");
const User = require('../models/User')
const OpportModel = require('../models/Opport')

exports.allMeRequest = async(req,res)=>{

    // if (!req.body.users || !req.body.name) {
    //     return res.status(400).send({ message: "Please Fill all the feilds" });
    // }

    // var users = JSON.parse(req.body.users);
    // users.push(req.user);

    try{

        // const groupChat = await Chat.create({
        //     chatName: req.body.name,
        //     users: users,
        //     isGroupChat: true,
        //     groupAdmin: req.user,
        //     projectID: req.body.projectID,
        //   });

        //   const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        //   .populate("users", "-password")
        //   .populate("groupAdmin", "-password");
    
        // res.status(200).json(fullGroupChat);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.createTeamRequest = async(req,res)=>{
    console.log('teamReqCreate',req.body)
    try{
        const teamRequest = await TeamRequest.create({
            projectID: req.body.project_id,
            ownerID: req.body.owner_id,
            senderID: req.body.sender_id, 
          });

        const fullTeamRequest = await TeamRequest.findOne({ _id: teamRequest._id })
        //   .populate("users", "-password")
        //   .populate("groupAdmin", "-password");
        console.log(fullTeamRequest)
        res.status(200).json(fullTeamRequest);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.CheckRequested = async(req,res)=>{

    try{
        const { project_id, sender_id } = req.body;
        console.log("####merequested",project_id, sender_id)
        const requested = await TeamRequest.findOne({
            // projectID: project_id,
            // senderID: sender_id
        })
        console.log(requested,"454545")
        if (!requested) {
            res.json({status:false})
        }
        res.json({status:true});

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.MeRequested = async(req,res)=>{

    try{
        const requested = await TeamRequest.find({
            ownerID: req.params.uid
        })
        // .populate("senderID", "-password", User)
        .populate({path: 'projectID', model: OpportModel})
        .populate({path: 'senderID', select:'-password -role', model: User})
        console.log(requested.length)
        if (!requested) {
            res.json({status:false, text: 'No request'})
        }
        res.json(requested);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.MeSentRequested = async(req,res)=>{

    try{
        console.log("uid me sent",req.params.uid)
        const requested = await TeamRequest.find({
            senderID: req.params.uid
        })
        // .populate("senderID", "-password", User)
        .populate({path: 'projectID', model: OpportModel})
        .populate({path: 'ownerID', select:'-password -role', model: User})
        console.log(requested.length)
        // res.json(requested);
        if (!requested) {
            res.json({status:false, text: 'No Sent request'})
        }else{
            res.json(requested);
        }
        

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.removeRequest = async(req,res) => {
   try {
    console.log("delete request",req.params.id)
    const teamRequest = await TeamRequest.findOneAndRemove({_id:req.params.id})
    res.send("remove success")
   } catch (error) {
    console.log(err)
    res.status(500).send('Server Error')
   }
};

exports.acceptToGroup = async(req,res)=>{
    try{
        const {accept, senderID, projectID} = req.body
        console.log("acceptToGroup",req.body)
        //check if requester is admin
        if (accept === false){
            const teamRequest = await TeamRequest.findOneAndRemove({
                projectID: projectID,
                senderID: senderID
            });
            res.send('remove success')

        }else if ( accept == true){
            //check if project don't have chat
            const chat = await Chat.findOne({projectID})
            if(!chat){
                // res.send("no Chat for this project")
                console.log("no Chat for this project")
            }
            const addUser = await Chat.findOneAndUpdate(
                {projectID: projectID}, 
                {
                    $push: { users: senderID }
                }, 
                {new: true}
            )
            // const addUser = await Chat.find({
            //     projectID: projectID
            // })
            // .populate("users", "-password")
            // .populate("groupAdmin", "-password");
            console.log("addUser", addUser)
            if (addUser){
                const teamRequest = await TeamRequest.findOneAndRemove({
                    projectID: projectID,
                    senderID: senderID
                });

                res.send({status: "success", data: addUser})
            }else{
                
                res.status(404).send('Chat not found')
            }
            // res.send({status: "add to group success"})
        }
        

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}