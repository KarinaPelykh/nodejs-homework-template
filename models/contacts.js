const fs = require("fs/promises");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const contactArry = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactArry);
};

const getContactById = async (id) => {
  const contactsById = await listContacts();
  const result = contactsById.find((item) => item.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const updateContactsId = async (id, data) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contact[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

  console.log(contact[index]);
  return contact[index];
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactsId,
};
