const { Schema, model } = require("mongoose");
const { undateValidators, handelValidateError } = require("./hooks");

const { regexpEmail } = require("../constants/user-contacts");

const userSchame = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: regexpEmail,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchame.pre("findOneAndUpdate", undateValidators);
userSchame.post("findOneAndUpdate", handelValidateError);

userSchame.post("save", handelValidateError);
const User = model("user", userSchame);
module.exports = User;
