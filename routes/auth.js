"use strict";

const express = require('express');
const router  = express.Router();
const { validations, validateFields, logUser } = require('../services/auth');

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', (req, res) => res.send('Get logged in user.'));

// @route POST api/auth
// @desc Auth user and return token
// @access Public
router.post('/', validations, validateFields, logUser);

module.exports = router;
