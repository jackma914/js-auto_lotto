"use strict";

const arrow = document.querySelector(".arrow");
const numbers = document.querySelector(".logo");
const form = document.getElementById("form");
const input = document.getElementById("msg");
// const map = document.getElementById("map");
const makeNumber = document.querySelector(".text-container");

const xhr = new XMLHttpRequest();

class App {
  constructor() {
    this._getNumber();
    // this._newWorkout();
    form.addEventListener("submit", this._choiceNumber.bind(this));
  }

  // 회차를 조회하여 받아온 회차 위닝 번호를 html에 추가해줍니다.
  _choiceNumber(e) {
    e.preventDefault();
    const num = input.value;

    //입력한 회차 값을 서버로 보내줍니다.
    xhr.open("GET", "http://localhost:3000/lottos/" + num);
    xhr.send();
    xhr.onload = () => {
      console.log(JSON.parse(xhr.response));
      let dataN = JSON.parse(xhr.response);

      // //받아온 번호 테스트
      // console.log(dataN.drwtNo3);

      //받아온 정보를 html에 추가해줍니다.
      if (dataN) {
        let html = `
        <div class="text">
        <span>${dataN.drwtNo1}</span>
        <span>${dataN.drwtNo2}</span>
        <span>${dataN.drwtNo3}</span>
        <span>${dataN.drwtNo4}</span>
        <span>${dataN.drwtNo5}</span>
        <span>${dataN.drwtNo6}</span>
      <div class="bnus-num">${dataN.bnusNo}</div>
      <span>${dataN.drwNo}</span>
      </div>
          `;
        arrow.insertAdjacentHTML("afterend", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }
    };
  }

  // 서버에서 번호를 받아와서 해더에 출력합니다.
  _getNumber() {
    axios.get("http://localhost:3000/lottos/last").then((res) => {
      const data = res.data;
      if (data) {
        let html = `
          <div class="winning-number">
            <span>${data.drwtNo1}</span>
            <span>${data.drwtNo2}</span>
            <span>${data.drwtNo3}</span>
            <span>${data.drwtNo4}</span>
            <span>${data.drwtNo5}</span>
            <span>${data.drwtNo6}</span>
          <div class="bnus-num">${data.bnusNo}</div>
          <span>${data.drwNo}</span>
        </div>
          `;
        numbers.insertAdjacentHTML("afterend", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }
    });
  }
}

class MakeNumber {
  constructor() {
    this._makeNumber();
  }

  _makeNumber() {
    let lotto = [];
    for (let i = 0; i < 7; i++) {
      let num = Math.floor(Math.random() * 45) + 1;

      // for in 문을 이용하여 생성된 번호중 겹치는걸 방지합니다.
      for (let j in lotto) {
        if (num == lotto[j]) {
          num = Math.floor(Math.random() * 45) + 1;
        }
      }
      lotto.push(num);
    }

    // !!!IMPORTANT slice를 이용하여 lottoN에 마지막 보너스 값을 제외한 번호를 넣어준뒤 sort를 이용하여 보너스 번호를 뺀 다머지 번호를 오름순차 번호로 정리하였습니다.
    let lottoN = lotto.slice(0, 6);

    lottoN.sort((a, b) => {
      return a - b;
    });

    console.log(lottoN);

    let html = `
        <div class="auto-number">
          <span>${lottoN[0]}</span>
          <span>${lottoN[1]}</span>
          <span>${lottoN[2]}</span>
          <span>${lottoN[3]}</span>
          <span>${lottoN[4]}</span>
          <span>${lottoN[5]}</span>
          <span>${"보너스" + lotto[6]}</span>
      </div>
        `;

    makeNumber.insertAdjacentHTML("afterend", html);
  }
}

class Map {
  constructor() {
    this._getMap();
  }

  _getMap() {}
}

new App();
new MakeNumber();
new Map();
