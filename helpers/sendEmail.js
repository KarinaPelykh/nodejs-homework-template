const nodemailer = require("nodemailer");
require("dotenv").config();
const { UKR_NET_PASSWORD, UKR_NET } = process.env;
const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,

  secure: true,
  auth: {
    user: UKR_NET,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   from: UKR_NET,
//   to: "wegema3118@recutv.com",
//   subject: "Test email",
//   html: "<Strong>Test email</Strong>",
// };

// transport
//   .sendEmail(email)
//   .then(() => {
//     console.log("Email send success");
//   })
//   .catch((error) => console.log(error.message));

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET };
  return transport.sendMail(email);
};

module.exports = sendEmail;
