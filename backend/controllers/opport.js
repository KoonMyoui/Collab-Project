const OpportModel = require('../models/Opport')
const User = require('../models/User')
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

exports.searchOpport = async(req,res)=>{
    //collaborate category
    try{
        const { keyword, category, collaborator } = req.query;
        console.log("searchOpport ",keyword)

        const query = {};

        if (keyword) {
        //   query.title = { $regex: keyword, $options: "i" };// insensitive case TT == tt
          query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { category: { $regex: keyword, $options: "i" } }
          ];
        }
    
        if (category) {
          query.category = category;
        }
    
        if (collaborator) {
          query.collaborate = collaborator;
        }
    
        query.enabled = true;

        const opport = await OpportModel.find(query).sort({ createdAt: -1 })
        res.send(opport);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.getAllOpport = async(req,res)=>{
    try{
        const opport = await OpportModel.find({
            enabled: true
        })
        .sort({ createdAt: -1 })
        res.send(opport);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.getOpportById = async(req,res)=>{
    try{
        const id = req.params.id;
        const opport = await OpportModel.findOne({ _id: id })
        .populate({path: 'owner', select:'-password -role', model: User});
        res.send(opport);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.getAllOpportById = async(req,res)=>{
    try{
        const id = req.params.id;
        const opport = await OpportModel.find({ owner: id })
        .populate({path: 'owner', select:'-password -role', model: User});
        res.send(opport);

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.updateOpport = async(req,res)=>{
    try{
        const {title, description, collaborate, category} = req.body
        console.log("updateOpport",req.body)
        console.log("updateOpport",req.params.id)
        const opport = await OpportModel.findByIdAndUpdate(
            req.params.id,
            {
                title: title,
                description: description,
                collaborate: collaborate,
                category: category
            },
            {new: true}
        )
        // const opp = await OpportModel.findById({_id: req.params.id})
        console.log("up",opport)
        res.send('update opport success');

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.removeOpport = async(req,res)=>{
    try{
        const id = req.params.id;
        const opport = await OpportModel.findByIdAndRemove({_id:id});
       res.send('remove success')

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.changeOpportStatus = async (req, res) => {
    try {
        console.log("status",req.body, req.params.id);
        const opport = await OpportModel.findByIdAndUpdate(
            { _id: req.params.id },
            { enabled: req.body.enabled }
        )
        res.send('update status success');

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.changeOpportJoin = async (req, res) => {
    try {
        console.log("isjoin",req.body, req.params.id);
        const opport = await OpportModel.findByIdAndUpdate(
            { _id: req.params.id },
            { isJoin: req.body.isJoin }
        )
        res.send('update Join success');

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};