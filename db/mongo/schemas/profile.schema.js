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
    type: [{
      id: Number,
      value: String,
    }],
    default: [],
  },
  last10Notes: {
    type: [{
      title: String,
      text: String,
      Users_id: Number,
    }],
    default: [],
  }
});

module.exports = mongoose.model('Profiles', ProfileSchema);
