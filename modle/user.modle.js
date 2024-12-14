// Import necessary modules
const mongoose = require('mongoose');
const db = require('../config/DB');
const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true, // Ensures that each username is unique
    trim: true, // Removes whitespace from both ends
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures that each email is unique
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required'],
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'department'],
    required: [true, 'User role is required'],
    default: 'student',
  },
  department: {
    type: String,
    required: function () {
      return this.role === 'teacher' || this.role === 'department';
    },
    trim: true,
  },
  publicKey: {
    type: String,
    required: [true, 'Public key is required for encryption'],
  },
  profilePicture: {
    type: String, // URL or path to the profile picture
    default: '', // Optional field
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
  lastLogin: {
    type: Date,
    default: null, // Will be updated on each login
  },
});

// Create indexes to optimize query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Export the User model
const usermodel = db.model('user',userSchema);
module.exports = usermodel;
