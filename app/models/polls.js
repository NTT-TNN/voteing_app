var mongoose = require('mongoose');
var voteSchema = new mongoose.Schema({ count: Number });
var choiceSchema = new mongoose.Schema({
  text: String,
  votes:Number
});
var Polls = new mongoose.Schema({
  question: { type: String, required: true },
  choices: [choiceSchema]
});

module.exports = mongoose.model('Polls',Polls);
