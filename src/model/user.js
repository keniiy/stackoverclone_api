const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
      },
      firstName: {
        type: String,
        required: [true, 'User must have a first name'],
        trim: true
      },
      lastName: {
        type: String,
        required: [true, 'User must have a last name'],
        trim: true
      },
      notifications: {
        type: Array
      },
      score: {
        type: Number
      },
      time : {
        type : Date, 
        default: Date.now 
      },
    },
  );

  userSchema.methods.comparePassword = function(password) {
    const user = bcrypt.compareSync(password, this.password);
    return user ? this : null;
  };
  
  userSchema.pre('save', function(next) {
    if (!this.confirmed) {
      const hashPassword = bcrypt.hashSync(this.password, 10);
      this.password = hashPassword;
    }
    next();
  });
  
  module.exports = mongoose.model('user', userSchema);