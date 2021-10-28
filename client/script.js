"use strict";

const numbers = document.querySelector(".logo");
const xhr = new XMLHttpRequest();

class App {
  constructor() {
    this._getNumber();
    this._choiceNumber();
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

  _choiceNumber() {
    // axios
    //   .get("http://localhost:3000/lottos/:id", {
    //     params: { id: 100 },
    //   })
    //   .then(function (res) {
    //     const data = res.data;
    //     console.log(data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    xhr.open("GET", "http://localhost:3000/lottos/" + 300);
    xhr.send();
    xhr.onload = () => {
      console.log(JSON.parse(xhr.response));
    };
  }
}

new App();
