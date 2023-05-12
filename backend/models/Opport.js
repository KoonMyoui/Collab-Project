const mongoose = require('mongoose');
const OpportSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        collaborate: {
            type: String,
        },
        category: {
            type: String,
        }
    },
    {timestamps: true}
);

module.exports = Opport = mongoose.model("opportunity", OpportSchema);