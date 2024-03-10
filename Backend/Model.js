const mongoose = require('mongoose');

const Document = new mongoose.Schema({
  _id: String,
  data: Object,
});
const Documents = new mongoose.model('Documents', Document);
const User = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

const Users = new mongoose.model('Users', User);
module.exports = { Documents, Users };
