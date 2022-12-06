const mongoose = require('mongoose');

const User = require('./userModel');
const Project = require('./projectModel');

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    text: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    date: {
      type: Date,
    },
    done: {
      type: Boolean,
    },
    hierarchy: {
      type: String,
      enum: ['0', '1', '2', '3'],
      required: true,
    },
    user_id: {
      type: String,
      ref: User,
      required: true,
    },
    project_id: {
      type: String,
      ref: Project,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
