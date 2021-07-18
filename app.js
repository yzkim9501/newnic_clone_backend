const express = require('express') //express를 쓴다
const app = express()
const port = 3000// port 는 3000번
const cors = require('cors');

app.use(cors());

// swagger 모듈
const swaggerUi = require('swagger-ui-express') 
const swaggerFile = require('./swagger/swagger_output.json') 

const connect = require('./schemas');
connect()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const postRouter = require("./routers/post");
const mailRouter = require("./routers/mail");
app.use("/api", [postRouter]);
app.use("/api", [mailRouter]);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use((req, res, next) => {
  next();
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})