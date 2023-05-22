const profileModel = require("../models/Profile")

exports.createProfile = async(req,res)=>{
    try{
        const { user } = req.user._id
        console.log("user",req.user._id)

        var profile = await profileModel.findOne({ owner: req.user._id })
        console.log("useprofiler",profile)
        if (profile) {
            return res.send({status: "Get Profile Success", data: profile})
        }else{
            newProfile = new profileModel({
                owner: req.user._id
            })

            console.log("newProfile",newProfile)
            await newProfile.save()
            res.send({status: "Create New Profile Success", data: newProfile});
        }

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.updateProfile = async(req,res)=>{
    try{
        console.log("updateProfile",req.body.skills)
        console.log("updateProfile",req.body.text)

        var { id, text, skills} = req.body

        // let profile = await profileModel.findById({ _id: id });

        if (text){
            const profile = await profileModel.findByIdAndUpdate(
                {_id: id},
                {
                    aboutMe: text
                }
            )
            console.log("update about me",text)
            res.send({status: "Update Profile Success", data: profile});
        }else if(skills){
            const profile = await profileModel.findByIdAndUpdate(
                {_id: id},
                {
                    //add array to other array
                    // $push: { skills: {$each: skills}} 

                    //replace with new array
                    skills: skills
                }
            )
            console.log("update skills",skills)
            res.send({status: "Update Profile Success", data: profile});
        }

        // res.send({status: "Update Profile Success", data: profile});

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}