const express = require("express");
const router = express.Router();//라우터라고 선언한다.
const Post = require("../schemas/post");

router.get("/all", async (req, res, next) => {
    const posts = await Post.find({});
    
      res.json({ posts: posts });
});

module.exports = router;