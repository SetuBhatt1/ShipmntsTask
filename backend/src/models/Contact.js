// imports
const mongoose = require("mongoose");
const Company = require("./Company");

// schema for Contact
const contactSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  type: {
    type: String,
    enum: ["Primary", "Secondary", "Other"],
    default: "Primary",
    required: true,
  },
});

// function to add contact
contactSchema.statics.addContact = async function (
  company,
  name,
  email,
  phone,
  dateOfBirth,
  type
) {
  // validating data
  if (!company) throw Error("Enter Company");
  if (!name) throw Error("Enter Name");
  if (!email) throw Error("Enter Email");
  if (!type) throw Error("Enter type from Primary, Secondary, Other");

  const newContact = await this.create({
    company,
    name,
    email,
    phone,
    dateOfBirth,
    type,
  });

  return newAddress;
};

contactSchema.statics.addContact = async function (company, name, email, phone, dateOfBirth, type) {
  // Validate required fields
  if (!company) throw new Error("Company ID is required.");
  if (!name) throw new Error("Name is required.");
  if (!email) throw new Error("Email is required.");
  if (!type) throw new Error("Type is required (Primary, Secondary, Other).");

  const newContact = await this.create({
    company,
    name,
    email,
    phone,
    dateOfBirth,
    type,
  });

  // Push the new contact's ID to the company's contacts array
  await mongoose.model("Company").findByIdAndUpdate(company, { $push: { contacts: newContact._id } });

  return newContact;
};

// model
const Contact = mongoose.model("Contact", contactSchema);

// exports
module.exports = Contact;

// request body format
// {
//   "company": "605f6810b98d5c2d7c4c2b9f",
//   "name": "John Doe",
//   "email": "john.doe@example.com",
//   "phone": "123-456-7890",
//   "dateOfBirth": "1990-01-01",
//   "type": "Primary"
// }
