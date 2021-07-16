const express = require('express') //express를 쓴다
const app = express()
const port = 3000// port 는 3000번

const connect = require('./schemas');
connect()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const postRouter = require("./routers/post");
app.use("/api", [postRouter]);

app.use((req, res, next) => {
  next();
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})