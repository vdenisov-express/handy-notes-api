const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  }
});

module.exports = mongoose.model('Profiles', ProfileSchema);



