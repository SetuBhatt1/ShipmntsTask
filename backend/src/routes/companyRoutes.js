// imports
const {getCompanies,addCompany} = require('../controllers/companyController');
const express = require('express');
const router = express.Router();

// get all companies
router.get('/', getCompanies);

// add a company
router.post('/',addCompany);

// exports
module.exports = router;

