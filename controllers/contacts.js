const Contact = require("../models/contacts");
const { HttpError } = require("../helpers");
const { cntrWrapper } = require("../decorator");

const contactAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deletContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateFavorit = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};
module.exports = {
  contactAll: cntrWrapper(contactAll),
  getContactById: cntrWrapper(getContactById),
  addContact: cntrWrapper(addContact),
  deletContact: cntrWrapper(deletContact),
  updateContact: cntrWrapper(updateContact),
  updateFavorit: cntrWrapper(updateFavorit),
};
