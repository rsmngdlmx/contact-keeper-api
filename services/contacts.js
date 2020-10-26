"use strict";

const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const validations = [
  check('name', "Please, add the contact's name.").not().isEmpty(),
  check('email', 'Please, add a valid email for the contact.').isEmail()
];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id })
      .sort({ created_at: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [ { msg: 'Server error.' } ] });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const contactData = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await contactData.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [ { msg: 'Server error.' } ] });
  }
};

const updateContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactData = {};
  if (name) contactData.name = name;
  if (email) contactData.email = email;
  if (phone) contactData.phone = phone;
  if (type) contactData.type = type;
  
  try {
    let contact = await Contact.findById(req.params.id);
    
    if (!contact) return res.status(404).json({ msg: 'Contact not found.' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized.' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactData },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [ { msg: 'Server error.' } ] });
  }
};

const deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    
    if (!contact) return res.status(404).json({ msg: 'Contact not found.' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized.' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [ { msg: 'Server error.' } ] });
  }
};

module.exports = {
  validations,
  validateFields,
  getContacts,
  addContact,
  updateContact,
  deleteContact
};
