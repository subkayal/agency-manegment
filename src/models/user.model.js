// node modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    is_active: { type: Boolean, enum: [true, false], default: true },
    is_deleted: { type: Boolean, enum: [true, false], default: false },
  },{ timestamps: true },
);

userSchema.pre('save', function (next) {
  const user = this;
  if (!this.isModified('password')) {
      return next();
  }
  const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async (oldPassword, password) => {
  let isMatch = await bcrypt.compare(password, oldPassword);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
