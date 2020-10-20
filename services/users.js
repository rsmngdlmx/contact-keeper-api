"use strict"

const { check, validationResult } = require('express-validator');
const { hashStr } = require('../outils/outils');
const jwt = require('../outils/jwt');
const User = require('../models/User');

const validations = [
  check('name', 'Please, add a name.').not().isEmpty(),
  check('email', 'Please, include a valid email.').isEmail(),
  check('password', 'Please, enter a password with 8 or more characters.')
    .isLength({ min: 8 })
];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    if (await User.findOne({ email })) {
      res.status(400).json({ errors: [ { msg: 'User already exists.' } ] });
    }

    const user = new User({ name, email, password: await hashStr(password) });
    await user.save();
    
    res.json({ token: jwt.createToken(user.id) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [ { msg: 'Server error.' } ] });
  }
};

module.exports = { validations, validateFields, registerUser };
