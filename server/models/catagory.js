const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'name is required',
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Catagory', catagorySchema);
