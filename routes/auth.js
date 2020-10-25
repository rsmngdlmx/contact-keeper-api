"use strict";

const express = require('express');
const router  = express.Router();
const {
  validations,
  validateFields,
  logUser,
  getUser } = require('../services/auth');
const auth = require('../middleware/auth');

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, getUser);

// @route POST api/auth
// @desc Auth user and return token
// @access Public
router.post('/', validations, validateFields, logUser);

module.exports = router;
