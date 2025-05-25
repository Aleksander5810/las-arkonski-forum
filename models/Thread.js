const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thread', threadSchema);
