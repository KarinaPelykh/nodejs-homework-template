const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { HttpError, sendEmail } = require("../helpers");

const { cntrWrapper } = require("../decorator");

const { JWT_SECRET, PROJECT_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifiEmail = {
    to: email,
    subject: "Veryfi email",
    html: `<a href="${PROJECT_URL}/api/auth/users/verify/${verificationToken}"  target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifiEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email no verify");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      password,
      email,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json(204, {
    message: "No Content",
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updataAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  const avatarSize = await Jimp.read(tmpUpload);
  avatarSize.resize(250, 250);

  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatar", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(401, "User not Found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "null",
  });

  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const emailUser = await User.findById({ email });
  if (!emailUser) {
    throw HttpError(400, "missing reguired field email");
  }

  const verifiEmail = {
    to: email,
    subject: "Veryfi email",
    html: `<a href="${PROJECT_URL}/api/auth/users/verify/${emailUser.verificationToken}"  target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifiEmail);
  if (emailUser.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  res.json({ message: " Verify email success send " });
};
module.exports = {
  signUp: cntrWrapper(signUp),
  signIn: cntrWrapper(signIn),
  getCurrent: cntrWrapper(getCurrent),
  signOut: cntrWrapper(signOut),
  updateSubscription: cntrWrapper(updateSubscription),
  updataAvatar: cntrWrapper(updataAvatar),
  verify: cntrWrapper(verify),
  resendVerifyEmail: cntrWrapper(resendVerifyEmail),
};
