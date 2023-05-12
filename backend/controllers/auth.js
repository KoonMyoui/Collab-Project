const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try{
        //check user
        const { username, password } = req.body;
        var user = await User.findOne({ username });
        if (user) {
            return res.status(400).send("User Already exists")
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            username,
            password
        });
        //encrypt
        user.password = await bcrypt.hash(password, salt);
        await user.save()
        res.send("Register Success");

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.login = async(req,res)=>{
    try {
        const {username, password} = req.body;
        console.log(username,password)
        var user = await User.findOneAndUpdate({username},{new: true});
        if(user && user.enabled){
            //check password
            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).send('Password Invalid!!')
            }

            //payload
            const payload = {
                user:{
                    _id: user._id,
                    username: user.username,
                    role: user.role
                }
            }
            //generate token
            jwt.sign(payload, 'joonSecret', {expiresIn: "1d"}, (err,token)=>{
                if(err) throw err;
                res.json({ token, payload });
            });

        }else{
            return res.status(400).send("User not found!!");
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listUser = async(req,res)=>{
    try{
        res.send('All User')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.currentUser = async(req,res)=>{
    try{
        // console.log('currentUser',req.user)
        const user = await User.findOne({username: req.user.username})
        .select('-password').exec()
        // console.log(user)
        res.send(user)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}