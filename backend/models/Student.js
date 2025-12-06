const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ===================================================================
// BÀI 1: ĐỊNH NGHĨA MONGOOSE SCHEMA VÀ MODEL
// ===================================================================

// Định nghĩa schema cho học sinh
const studentSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  class: { 
    type: String, 
    required: true 
  }
}, { 
  collection: 'students'
});

// Export model
module.exports = mongoose.model('Student', studentSchema);
