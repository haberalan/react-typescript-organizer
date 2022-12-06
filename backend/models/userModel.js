const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 100,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled!');
  }

  const enteredEmail = email.trim().toLowerCase();

  if (!enteredEmail) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isEmail(enteredEmail)) {
    throw Error('Email is not valid!');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough!');
  }

  const emailExists = await this.findOne({ email: enteredEmail });

  if (emailExists) {
    throw Error('Email is already in use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: enteredEmail,
    password: hashedPassword,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled!');
  }

  const enteredEmail = email.trim().toLowerCase();

  if (!enteredEmail) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isEmail(enteredEmail)) {
    throw Error('Email is not valid!');
  }

  const user = await this.findOne({ email: enteredEmail });

  if (!user) {
    throw Error('Incorrect email!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  return user;
};

userSchema.statics.updateData = async function (user_id, password, newPassword) {
  if (!password || !newPassword) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error('Password is not strong enough!');
  }

  const user = await this.findById(user_id);

  if (!user) {
    throw Error('There was an error!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  const isUpdatedPasswordSame = await bcrypt.compare(newPassword, user.password);

  if (isUpdatedPasswordSame) {
    throw Error('New password must be different!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser = await this.findByIdAndUpdate(user_id, { password: hashedPassword });

  return updatedUser;
};

userSchema.statics.deleteUser = async function (user_id) {
  const user = await this.findById(user_id);

  if (!user) {
    throw Error('There was an error!');
  }

  const deletedUser = await this.findByIdAndDelete(user_id);

  return deletedUser;
};

module.exports = mongoose.model('User', userSchema);
