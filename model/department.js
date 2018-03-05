

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var DepartmentSchema = new Schema({

  departmentName: String, // Engineering, Liberal Arts, Business...
  description: String,
  dean: {type : Schema.Types.ObjectId, ref : 'Faculty'},
  office: String,
  phoneNumber: String,

  programs: {
    courses: [{type: Schema.Types.ObjectId, ref : 'Course'}],
    type: String, // BS, BA, PHD..
    delivery: String, // Online, Campus, Hybrid
    pathways: {
      // Future schooling path
    }
  },

  faculty: {
    faculyStaff: [{type : Schema.Types.ObjectId, ref : 'Faculty'}],

    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      zip: String,
    },
    phone: {
      local: String,
      tollFree: String
    },
    fax: String,

    description: String,
  }

});

module.exports = mongoose.model('Department', DepartmentSchema);
