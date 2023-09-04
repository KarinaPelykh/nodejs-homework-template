const express = require("express");

const contrroller = require("../../controllers/auth");

const { valdateBody } = require("../../decorator/valdateBody");

const { authenticate } = require("../../middelwares");

const schames = require("../../schemas/user");

const router = express.Router();

const signupValidateMiddlewere = valdateBody(schames.userSignupSchame);

const signinValidateMiddlewere = valdateBody(schames.userSigninSchame);

router.post("/users/register", signupValidateMiddlewere, contrroller.signUp);

router.post("/users/login", signinValidateMiddlewere, contrroller.signIn);

router.get("/users/current", authenticate, contrroller.getCurrent);

router.post("/users/logout", authenticate, contrroller.signOut);

module.exports = router;
