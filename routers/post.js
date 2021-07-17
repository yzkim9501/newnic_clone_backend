const express = require("express");
const router = express.Router();//라우터라고 선언한다.
const Post = require("../schemas/post");


router.get("/all", async (req, res, next) => {
    const posts = await Post.find({}).lean();
    for(let i=0;i<posts.length;i++){
        posts[i]['htmlContent'] = decodeEntities(posts[i]['htmlContent'])
    }
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

        // content는 최대 100글자까지만 출력되도록 데이터 가공
        post.forEach((data) => {
            data.plainContent = (data.plainContent.substr(0, 100));
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


        postDetail['htmlContent'] = decodeEntities(postDetail['htmlContent'])

        res.json({ detail: postDetail }); 
 
    } catch (err) {
        res.status(400).send({
            "errorMessage": `${err} : 단일 포스트 불러오던 중 에러발생!!`
        })
    }
    
});


// 검색 포스트 불러오기 `search/posts?keyword=${keyword}&sort=${sort}`
router.get("/search", async (req, res) => {
    try {
        const { keyword,sort } = req.query;
        const options = [//띄어쓰기를 하지 않아도 검색이 될 수 있도록 regExp 사용
            { title: new RegExp(keyword) },
            { content: new RegExp(keyword) },
        ]

        let post = await Post.find({ $or: options }).sort("date").lean();
        if(sort=='relative'){
            for(let i=0;i<post.length;i++){ //제목 및 내용에서 검색어 갯수만큼 rel의 변수에 넣기
                let rel=0;
                rel+=post[i]['title'].split(keyword).length-1
                rel+=post[i]['content'].split(keyword).length-1
                post[i]['rel']=rel
            }
            post.sort((a, b) => (b.rel) - (a.rel));// rel의 값 순으로 내림차순 정렬
        }

        post.forEach((data) => {
            data.plainContent = (data.plainContent.substr(0, 100));
        })
        // 조회되는 게시물이 없을 시 403 반환
        if (!post[0]) {
            res.status(403).send({
                "errorMessage": "조회되는 게시물이 없습니다."
            })
            return;
        }
        res.json({ post });

    } catch (err) {
        res.status(400).send({
            "errorMessage": `${err} : 검색 포스트 불러오던 중 에러발생!!`
        })
    }


});


module.exports = router;

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}