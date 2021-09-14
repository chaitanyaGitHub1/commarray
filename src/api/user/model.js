const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      index: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    loginType: {
      type: String,
      enum: ["facebook", "google", "custom"],
    },
    signupType: {
      type: String,
      enum: ["facebook", "google", "custom"],
    },
    loginStatus: {
      type: String,
      enum: ["active", "inactive"],
    },

    accountStatus: {
      default: "active",
      type: String,
    },
    fcmToken: [{ type: String }],

    createdTime: {
      type: Date,
      default: Date.now,
    },
    updatedTime: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: "v1" }
);

userSchema.index({
  address: "2dsphere",
});

module.exports = mongoose.model("User", userSchema);
