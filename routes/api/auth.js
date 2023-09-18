const express = require("express");

const contrroller = require("../../controllers/auth");

const { valdateBody } = require("../../decorator/valdateBody");

const { authenticate, upload } = require("../../middelwares");

const schames = require("../../schemas/user");

const router = express.Router();

const signupValidateMiddlewere = valdateBody(schames.userSignupSchame);

const signinValidateMiddlewere = valdateBody(schames.userSigninSchame);

const emailValidateMiddlewere = valdateBody(schames.userEmailSchame);

router.post("/users/register", signupValidateMiddlewere, contrroller.signUp);

router.post("/users/login", signinValidateMiddlewere, contrroller.signIn);

router.get("/users/current", authenticate, contrroller.getCurrent);

router.post("/users/logout", authenticate, contrroller.signOut);

router.patch("/users/users", authenticate, contrroller.updateSubscription);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  contrroller.updataAvatar
);

router.get("/users/verify/:verificationToken", contrroller.verify);

router.post(
  "/users/verify",
  emailValidateMiddlewere,
  contrroller.resendVerifyEmail
);
module.exports = router;
