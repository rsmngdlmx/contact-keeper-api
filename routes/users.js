"use strict"

const express = require('express');
const {
  validations,
  validateFields,
  registerUser } = require('../services/users');
const router  = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', validations, validateFields, registerUser);

module.exports = router;
