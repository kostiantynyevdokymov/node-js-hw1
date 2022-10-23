const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

// getting and displaing the entire list of contacts in the form of a table
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const list = JSON.parse(data);
    return console.table(list);
  } catch (error) {
    console.error(error.message);
  }
}
// get contact by id
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const contactById = parsedData.find((contact) => contact.id === contactId);
    console.table(contactById);
    return contactById;
  } catch {
    console.error(error.message);
  }
}

// remove contact by id
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id != contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.table(filteredContacts);
    console.log("Successfully deleted");
  } catch {
    console.error(error.message);
  }
}

// add contact
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const lastId = Number(parsedData[parsedData.length - 1].id);
    const id = String(lastId + 1);
    parsedData.push({ id, name, email, phone });
    console.table(parsedData);
    const jsonNewData = JSON.stringify(parsedData);
    fs.writeFile(contactsPath, jsonNewData);
    console.log("Successfully added");
  } catch {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
