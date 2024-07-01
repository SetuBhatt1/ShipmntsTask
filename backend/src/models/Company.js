// imports
const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

// schema for company
const companySchema = mongoose.Schema({
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
  name: {
    type: String,
    required: true,
    unique:true
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  noOfEmployees: {
    type: Number,
  },
  foundedDate: {
    type: Date,
  },
  industryType: {
    type: String,
    enum: ["Technology", "Finance", "Healthcare", "Retail", "Other"],
    required: true,
  },
});

// model
const Company = mongoose.model("Company", companySchema);

// exports
module.exports = Company;

// request body  format
// {
//   "name": "setu Corporation",
//   "address": "123 Main St, Anytown",
//   "phone": "123-456-7890",
//   "email": "info@setu.com",
//   "website": "www.setu.com",
//   "noOfEmployees": 100,
//   "foundedDate": "2000-01-01",
//   "industryType": "Technology"
// }
