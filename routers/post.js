const express = require("express");
const router = express.Router();//라우터라고 선언한다.
const Post = require("../schemas/post");


router.get("/all", async (req, res, next) => {
    const posts = await Post.find({});
    
      res.json({ posts: posts });
});

// 전체 포스트 불러오기 `main?category=${category}`
router.get("/main", async (req, res) => {
    try {
        const { category } = req.query; 
        
        // 카테고리가 존재할 시에만 카테고리 별 조회, 없을 시 전체 조회
        const post = (category) ? await Post.find({ category }) : await Post.find({});      
        
        // 조회되는 게시물이 없을 시 403 반환
        if (!post[0]) {
            res.status(403).send({
                "errorMessage": "조회되는 게시물이 없습니다."
            })
            return;
        }

        // content는 최대 53글자까지만 출력되도록 데이터 가공
        post.forEach((data) => {
            data.content = (data.content.substr(0, 53)) + '...';
        })

        res.json({ post });

    } catch (err) {
        res.status(400).send({
            "errorMessage": `${err} : 전체 포스트 불러오던 중 에러발생!!`
        })
    }


});

// 단일 포스트 불러오기 
router.get('/detail/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const postDetail = await Post.findOne({ postId })

        // post Id가 잘못되었을 시 403 반환
        if (!postDetail) {
            res.status(403).send({
                "errorMessage": "조회되는 게시물이 없습니다."
            })
            return;
        }
        res.json({ detail: postDetail });

    } catch (err) {
        res.status(400).send({
            "errorMessage": `${err} : 단일 포스트 불러오던 중 에러발생!!`
        })
    }
    
});


module.exports = router;