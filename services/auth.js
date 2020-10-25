"use strict";

const bcrypt = require('bcryptjs');
const jwt = require('../outils/jwt');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validations = [
  check('email', 'Please, include a valid email.').isEmail(),
  check('password', 'Password is required.').exists()
];

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};

const logUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ errors: [ { msg: 'Invalid credentials.' } ] });
    }
    
    res.json({ token: jwt.createToken(user.id) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [ { msg: 'Server error.' } ] });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msj: 'Server error.' });
  }
};

module.exports = { validations, validateFields, logUser, getUser };
