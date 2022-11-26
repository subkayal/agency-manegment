// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    agencyId: { type: Schema.Types.ObjectId, ref: 'Agency' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: Number, default: 0 },
    totalBill: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },{ timestamps: true },
);

module.exports = mongoose.model('Client', clientSchema);
