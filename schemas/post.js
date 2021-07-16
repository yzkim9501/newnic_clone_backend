const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
  postId: {
    type: Number,
    unique: true
  },
  category: {
    type: String
  },
  thumbnail: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  date: {
    type: String
  },
  hashtag: {
    type: [String]
  }
});

module.exports = mongoose.model("Post", postSchema);