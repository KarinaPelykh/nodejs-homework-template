const express = require("express");

const router = express.Router();

const contrroller = require("../../controllers/contacts");

const { valdateBody } = require("../../decorator/valdateBody");

const schemas = require("../../schemas/contacts");

const addContactValidate = valdateBody(schemas.schemaContact);
const updateContactFavoritValidate = valdateBody(
  schemas.contactUpdateFavoriteSchema
);

const { isValidId } = require("../../middelwares");

router.get("/", contrroller.contactAll);

router.get("/:id", isValidId, contrroller.getContactById);

router.post("/", addContactValidate, contrroller.addContact);

router.delete("/:id", contrroller.deletContact);

router.put("/:id", addContactValidate, contrroller.updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  updateContactFavoritValidate,
  contrroller.updateFavorit
);

module.exports = router;
