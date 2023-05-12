const mongoose = require('mongoose');
const TeamRequestSchema = new mongoose.Schema(
    {
        projectID: { type: mongoose.Schema.Types.ObjectId, ref: "Opport" },
        ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        senderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        statusPending: { type: Boolean, default: false},
    },
    {timestamps: true}
);

module.exports = TeamRequest = mongoose.model("teamRequest", TeamRequestSchema);