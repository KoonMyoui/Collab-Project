const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        aboutMe: { type: String ,default: ""},
        skills: [{ type: String }],
    },
    {timestamps: true}
);

module.exports = Profile = mongoose.model("profile", ProfileSchema);