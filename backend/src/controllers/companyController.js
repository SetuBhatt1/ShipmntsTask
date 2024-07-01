// imports
const Company = require("../models/Company");

// get all companies
const getCompanies = async (req, res) => {
  try {
    res.json(await Company.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add a company
const addCompany = async (req, res) => {
  const {
    contacts,
    name,
    address,
    phone,
    email,
    website,
    noOfEmployees,
    foundedDate,
    industryType,
  } = req.body;

  try {
    const newCompany = new Company({
      contacts,
      name,
      address,
      phone,
      email,
      website,
      noOfEmployees,
      foundedDate,
      industryType,
    });

    // Saving new company
    await newCompany.save();

    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports
module.exports = { getCompanies, addCompany };
