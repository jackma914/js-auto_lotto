"use strict";

const arrow = document.querySelector(".arrow");
const numbers = document.querySelector(".logo");
const form = document.getElementById("form");
const input = document.getElementById("msg");

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

    xhr.open("GET", "http://localhost:3000/lottos/" + num);
    xhr.send();
    xhr.onload = () => {
      console.log(JSON.parse(xhr.response));
      let dataN = JSON.parse(xhr.response);

      // //받아온 번호 테스트
      console.log(dataN.drwtNo3);

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

new App();
