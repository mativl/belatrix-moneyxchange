const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("exchange", exchange);