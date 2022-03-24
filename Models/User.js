// const { Module } = require("module");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const Userschema = new mongoose.Schema({
  name: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  mobile: {
    type: Number,
  },
  age: {
    type: Number,
  },
  place: {
    type: String,
  },
});

const mongodbmodel = mongoose.model("User", Userschema);

module.exports = mongodbmodel;
