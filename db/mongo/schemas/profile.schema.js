const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  tags: {
    type: [{
      id: Number,
      value: String
    }],
    default: []
  },
  last10Notes: {
    type: [{
      title: String,
      text: String,
      Users_id: Number
    }],
    default: []
  },
  ratingByAllNotes: {
    type: Number,
    default: 0
  },
  ratingByLast10Notes: {
    type: Number,
    default: 0
  },
  activityRate: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Profiles', ProfileSchema);
