const mongoose = require('mongoose');

const User = require('./userModel');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    user_id: {
      type: String,
      ref: User,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
