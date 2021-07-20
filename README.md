# newnic_clone_backend

- ### 프로젝트 소개

  항해99 - 클론코딩 13조, 뉴닉 클론코딩

- ### 프로젝트 기간
  2021/07/16 ~ 2021/07/23

## 1. Wireframe (Figma)

## 2. Developers

- Backend (Node.js)
  - 김예지
  - 박진홍
  - 윤송
- Frontend (React)
  - 이동민
  - 최수임

## 3. 노션 설계 페이지

https://yzkim9501.notion.site/13-474b8f8ce3d94013b8eed13eb788458d

## 4. 기술스택 및 라이브러리

|     종류      |  이름   |
| :-----------: | :-----: |
|   개발 언어   | Node.js |
| 데이터베이스  | MongoDB |
| 웹 프레임워크 | Express |

| 라이브러리 |       Appliance       |
| :--------: | :-------------------: |
|   React    |         Front         |
|  Mongoose  | MongoDB 데이터 모델링 |
|    Cors    | Request Resource 제한 |
|  Swagger   |      API 문서화       |


<br>
<hr>

##  Jest 테스트 코드
  <details>
    <summary>기본설정</summary>
    <br>
    * 패키지 설치

      > npm init
      npm i jest -D
      npm i jest supertest -D

  <br>
    * 테스트 파일 생성

      > post.spec.js
  </details>

  <details>
    <summary>Package.json 설정</summary>
        <br>

      >  "scripts": {
  	        "test": "jest"
          }
  </details>

  <details>
    <summary>테스트 코드 실행</summary>
        <br>

      > npm run test
  </details>
  <br>