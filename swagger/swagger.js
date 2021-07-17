const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json' // swagger-autogen이 실행 후 생성될 파일 위치와 이름
const endpointsFiles = ['./routers/post.js'] // 읽어올 Router가 정의되어 있는 js파일들

// swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, endpointsFiles);
