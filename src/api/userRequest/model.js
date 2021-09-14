const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRequestSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      required: true,
      type: String,
      index: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

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

userRequestSchema.index({
  address: "2dsphere",
});

module.exports = mongoose.model("UserRequest", userRequestSchema);
