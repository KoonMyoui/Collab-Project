const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.auth = (req,res,next) => {
    try {
        //send from headers
        const token = req.headers["authtoken"];

        if(!token){
            return res.status(401).send("no token, authorization denied");
        }
        const decoded = jwt.verify(token, "joonSecret", (err, res) => {
            if (err){
                return "token expired"
            }
            return res
            
        });
        console.log("decoded",decoded)
        if (decoded == "token expired"){
            return res.send({ status: "error", data: "token expired"})
        }
        // console.log("middleware", decoded);
        req.user = decoded.user
        next()

    } catch (err) {
        console.log(err)
        res.status(401).send('Invalid Token!')
    }
}

exports.isAdmin = async(req,res,next) => {
    try {
        const { username } = req.user
        const adminUser = await User.findOne({ username }).exec()
        if (adminUser.role !== 'admin'){
            res.status(403).send('Admin Access Denied')
        }else{
            next()
        }
       
    } catch (err) {
        console.log(err)
        res.status(401).send('Admin Access Denied')
    }
}

exports.isModerator = async(req,res,next) => {
    try {
        const { username } = req.user
        const adminUser = await User.findOne({ username }).exec()
        if (adminUser.role !== 'admin'){
            res.status(403).send('Admin Access Denied')
        }else{
            next()
        }
       
    } catch (err) {
        console.log(err)
        res.status(401).send('Admin Access Denied')
    }
}

exports.protect = async(req, res, next) => {
    let token;

    if ( req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "joonSecret");
            console.log('tokennn',token,decoded)
            // req.user = decoded.user
            req.user = await User.findById(decoded.user._id).select("-password");
            console.log('protect',req.user)
            next();

        } catch (error) {
            console.log(error)
            res.status(401).send('somthing wrong token')
        }
    }
}