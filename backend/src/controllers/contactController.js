// imports
const Contact = require("../models/Contact");

// get all contacts
const getContacts = async (req, res) => {
  try {
    res.json(await Contact.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add a contact
const addContact = async (req, res) => {
  const { company, name, email, phone, dateOfBirth, type } = req.body;

  try {
    const newContact = await Contact.addContact(
      company,
      name,
      email,
      phone,
      dateOfBirth,
      type
    );
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports
module.exports = { getContacts, addContact };

