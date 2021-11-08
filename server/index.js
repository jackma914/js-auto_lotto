//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express();
const request = require("request");

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const moment = require("moment");

// @path {GET} http://localhost:3000/
// @description 요청 데이터 값이 없고 반환 값이 있는 GET Method

//최신 회차 로또 번호를 가져옵니다.
app.get("/lottos/last", (req, res) => {
  let week = getWeek();

  request.get(
    {
      url:
        "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" +
        week,
      strictSSL: false,
    },
    (error, response, body) => {
      console.log(error);
      res.json(JSON.parse(body));
    }
  );
});

// app.get("lottos/num", (req, res) => {
//   let num = allNumber();
//   request.get({ num }, (error, response, body) => {
//     console.log(error);
//     res.json(JSON.parse(body));
//   });
// });

// allNumber = () => {
//   const t3 = moment("20021207");
//   const t4 = moment();
//   const dfff = moment.duration(t4.diff(t3)).asDays();
//   let allN = Math.floor(dfff / 7 + 1);
//   for (let i = 0; i < allN; i++) {
//     return Math.floor(allN - i);
//   }
// };
// // console.log(allNumber());

getWeek = () => {
  const t1 = moment("20021207");
  const t2 = moment();
  const dff = moment.duration(t2.diff(t1)).asDays();

  return Math.floor(dff / 7 + 1);
};

// http listen port 생성 서버 실행
app.listen(3000, () => console.log("서버 오픈"));

//클라이언트 회차 번호 검색 입니다.
app.get("/lottos/:id", (req, res) => {
  request.get(
    {
      url:
        "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" +
        req.params.id,
      strictSSL: false,
    },
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});
