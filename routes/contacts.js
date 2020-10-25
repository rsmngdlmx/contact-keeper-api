"use strict";

const express = require('express');
const router  = express.Router();
const {
  validations,
  getContacts,
  addContact,
  updateContact,
  deleteContact } = require('../services/contacts');
const auth = require('../middleware/auth');

// @route GET api/contacts
// @desc Get all users' contacts
// @access Private
router.get('/', auth, getContacts);

// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post('/', [auth, validations], addContact);

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', auth, updateContact);

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', auth, deleteContact);

module.exports = router;
