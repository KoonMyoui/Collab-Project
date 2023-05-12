const OpportModel = require('../models/Opport')

const validateReq = (body) => {
    if (!body.title) throw new Error("Please filled title");
    if (!body.description) throw new Error("Please filled description");
};

exports.createOpport = async(req,res)=>{
    try{
        //check 
        validateReq(req.body)
        console.log('body', req.body)
        console.log('owner', req.user)

        const { title, description, collaborate, category } = req.body;

        var opport = await OpportModel.findOne({ title });
        if (opport) {
            return res.status(400).send("Project Already exists")
        }

        newOpport = new OpportModel({
            owner: req.user._id,
            title,
            description,
            collaborate,
            category
        })
        console.log(newOpport)
        await newOpport.save()
        res.send({status: "Create Opportunity Success", data: newOpport});

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.getAllOpport = async(req,res)=>{
    try{
        const opport = await OpportModel.find({});
        res.send(opport);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.getOpportById = async(req,res)=>{
    try{
        const id = req.params.id;
        const opport = await OpportModel.findOne({ _id: id });
        res.send(opport);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.updateOpport = async(req,res)=>{
    try{

        res.send('update opport');

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.removeOpport = async(req,res)=>{
    try{
        const id = req.params.id;
        const opport = await OpportModel.findOneAndRemove({_id:id});
       res.send('remove success')

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}