"use strict";

const express = require('express');
const router  = express.Router();
const {
  validations,
  validateFields,
  registerUser } = require('../services/users');

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', validations, validateFields, registerUser);

module.exports = router;
