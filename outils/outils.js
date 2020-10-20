"use strict"

const bcrypt = require('bcryptjs');

const hashStr = async str => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(str, salt);
};

module.exports = { hashStr };
