const mongoose = require('mongoose')
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONG_URL)
        console.log('connect DB successfully')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB