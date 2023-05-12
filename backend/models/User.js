const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
      },
      password: {
        type: String,
      },
      role: {
        type: String,
        default: "user",
      },
      enabled: {
        type: Boolean,
        default: true,
      },
      pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    {timestamps: true}
);

module.exports = User = mongoose.model("users", UserSchema);