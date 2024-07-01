// imports
const { getContacts, addContact } = require("../controllers/contactController");
const express = require("express");
const router = express.Router();

// get all contacts
router.get("/", getContacts);

// add a contact
router.post("/", addContact);

module.exports = router;
