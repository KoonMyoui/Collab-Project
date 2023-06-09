const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        projectID: { type: mongoose.Schema.Types.ObjectId, ref: "Opport" }
    },
    {timestamps: true}
);

module.exports = Chat = mongoose.model("chats", ChatSchema);