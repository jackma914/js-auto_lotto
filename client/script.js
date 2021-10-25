"use strict";

const numbers = document.querySelector(".logo");

class App {
  constructor() {
    this._getNumber();
  }

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
          <div class="contact">${data.drwtNo5}</div>
        </div>
          `;
        numbers.insertAdjacentHTML("afterend", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }
    });
  }

  _loadNumber(data) {
    if (data) {
      console.log(data);
    } else {
      console.log("오류");
    }
    // const { drwtNo1 } = number;
    // const { drwtNo2 } = number;
    // const { drwtNo3 } = number;
    // const { drwtNo4 } = number;
    // const { drwtNo5 } = number;
    // const numbers = [drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5];

    //   let html = `
    //   <div class="winning-number">
    //     <span>${number.drwtNo1}</span>
    //     <span>${number.drwtNo2}</span>
    //     <span>${number.drwtNo3}</span>
    //     <span>${number.drwtNo4}</span>
    //   <div class="contact">${number.drwtNo5}</div>
    // </div>
    //   `;

    //   numbers.insertAdjacentHTML("afterend", html);
  }

  // _renderWorkout(numbers) {}
}
new App();
