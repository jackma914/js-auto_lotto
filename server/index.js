const moment = require("moment");

//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express();

const request = require("request");

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @path {GET} http://localhost:3000/
// @description 요청 데이터 값이 없고 반환 값이 있는 GET Method

app.get("/lottos/last", (req, res) => {
  let week = getWeek();

  request.get(
    {
      uri:
        "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" +
        week,
      strictSSL: false,
    },
    (error, response, body) => {
      // console.log(error);
      res.json(JSON.parse(body));
    }
  );
});

// http listen port 생성 서버 실행
app.listen(3000, () => console.log("서버 오픈"));

getWeek = () => {
  return 100;
};
