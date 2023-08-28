const { Schema, model } = require("mongoose");
const { undateValidators, handelValidateError } = require("./hooks");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", undateValidators);
contactSchema.post("findOneAndUpdate", handelValidateError);

contactSchema.post("save", handelValidateError);
const Contact = model("contact", contactSchema);
module.exports = Contact;
