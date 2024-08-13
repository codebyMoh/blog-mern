const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
});

module.exports = mongoose.model("mbs_users", usersSchema);
