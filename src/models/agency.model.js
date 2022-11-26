// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const agencySchema = new Schema(
  {
    name: { type: String, default: '' },
    address1: { type: String, default: '' },
    address2: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    phone: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },{ timestamps: true },
);

module.exports = mongoose.model('Agency', agencySchema);
