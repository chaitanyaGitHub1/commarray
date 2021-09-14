const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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

module.exports = mongoose.model("Group", groupSchema);
