const Post = require("./schemas/post");
const app = require('./app');
const request = require('supertest');
const { expect } = require('@jest/globals');

// main
it('GET /api/main 성공 시 Status Code는 200 을 반환한다.', async() => {
    const response = await request(app).get('/api/main')
    expect(response.statusCode).toBe(200);
});

// main with category - 200
it('GET /api/main?category=${category} 카테고리별 게시물 존재 시 200을 반환한다.', async() => {
    const response = await request(app).get('/api/main').query({ category: '세계'})
    expect(response.statusCode).toBe(200);
});

// main with category - 403
it('GET /api/main?category=${category} 존재하지 않는 카테고리 입력 시 403을 반환한다.', async() => {
    const response = await request(app).get('/api/main').query({ category: 0})
    expect(response.statusCode).toBe(403);
    expect(response.body.errorMessage).toBe('조회되는 게시물이 없습니다.')
});

// detail
it('GET /api/detail 성공 시 Status Code는 200 을 반환한다.', async() => {
    const response = await request(app).get('/api/detail/1')
    expect(response.statusCode).toBe(200);
});

// search - 200
it('GET /api/search 검색 결과가 있을 시 Status Code는 200 을 반환한다.', async() => {
    const response = await request(app).get('/api/search').query({ keyword: "코로나", sort: 'date'})
    expect(response.statusCode).toBe(200);
});

// search - 403
it('GET /api/search 검색 결과가 없을 시 Status Code는 403 을 반환한다.', async() => {
    const response = await request(app).get('/api/search').query({ keyword: "qwe", sort: 'date'})
    expect(response.statusCode).toBe(403);
    expect(response.body.errorMessage).toBe('조회되는 게시물이 없습니다.')
});

// mail
it('POST /api/mailing 이메일이 성공적으로 발송되었을 시 200을 반환한다.', async() => {
    const response = await request(app).post('/api/mailing')
                                        .send({emailAddress: 'ysong0504@gmail.com', nickname: '임시테스트'})
    expect(response.statusCode).toBe(200);
});



