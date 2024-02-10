const mongoose = require('mongoose');

const Document = new mongoose.Schema({
  _id: String,
  data: Object,
});
const Documents = new mongoose.model('Documents', Document);
const User = new mongoose.Schema({
  username: String,
  password: String,
});

const Users = new mongoose.model('Users', User);
module.exports = { Documents, Users };
