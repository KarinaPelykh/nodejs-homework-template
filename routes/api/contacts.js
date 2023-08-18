const express = require("express");

const router = express.Router();

const contrroller = require("../../controllers/contacts");

const { valdateBody } = require("../../decorator/valdateBody");

const schemas = require("../../schemas/contacts");

const addContactValidate = valdateBody(schemas.schemaContact);

router.get("/", contrroller.contactAll);

router.get("/:id", contrroller.getContactById);

router.post("/", addContactValidate, contrroller.addContact);

router.delete("/:id", contrroller.deletContact);

router.put("/:id", addContactValidate, contrroller.updateContact);

module.exports = router;
