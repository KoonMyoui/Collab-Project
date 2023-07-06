const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.allUser = async(req,res)=>{
    try{
        const user = await User.find({}).select("-password").exec();
        res.send(user);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.readUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findOne({ _id: id }).select("-password").exec();
        res.send(user);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.updateUser = async(req,res)=>{
    try{
        console.log("updateValues",req.body)
        var {id,username, password} = req.body
        //check username is used
        
        const usedUser = await User.findOne({ username: username})
        if (usedUser){
            return res.status(400).send("User Already exists")
        }
        
        // 1 gen salt
        const salt = await bcrypt.genSalt(10);
        // 2 encrypt
        var enPassword = await bcrypt.hash(password, salt);

        const user = await User.findOneAndUpdate(
        { _id: id },
        {   username: username,
            password: enPassword }
        );
        res.send(user);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.removeUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findOneAndRemove({_id:id});
       res.send('removeUser')

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.changeRole = async(req,res)=>{
    try{ 
        console.log(req.body)
        const user = await User.findOneAndUpdate(
            {_id: req.body.id},
            { role: req.body.role }
        ).select("-password").exec();
        res.send(user);
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.changeStatus = async (req, res) => {
    try {

      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { enabled: req.body.enabled }
      ).select("-password").exec();
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  };


exports.searchUser = async(req,res)=>{
    try{
        const keyword = req.query.keyword 
        ?   {
                $or: [
                    { username: {$regex: req.query.keyword, $options: "i"}}
                ],
            } 
        : {};
        // const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        const user = await User.find(keyword).select("-password -enabled -role").exec();
        res.send(user);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}
