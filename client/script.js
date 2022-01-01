"use strict";
const home = document.querySelector(".header");

const form = document.querySelector("form");
const input = document.getElementById("msg");
const select = document.getElementById("dwrNoList");
const button = document.getElementById("auto-button");
// const map = document.getElementById("map");
const makeNumber = document.querySelector(".text-container");
const dwrNoList = document.getElementById("dwrNoList");

const xhr = new XMLHttpRequest();

class App {
  constructor() {
    this._plusChoiceNumber();
    this._getNumber();
    // this._newWorkout();
    form.addEventListener("change", this._choiceNumber.bind(this));
  }

  _plusChoiceNumber() {
    axios.get("http://localhost:3000/lottos/last").then((res) => {
      let dataS = res.data.drwNo;
      let drwN = [];

      for (let i = 0; i < dataS; i++) {
        console.log(dataS - i);
        drwN.push(dataS - i);
        if (drwN) {
          let html = `
        <option class="choice-number" value="${drwN[i]}">${drwN[i]}</option>
            `;
          dwrNoList.insertAdjacentHTML("afterbegin", html);
        }
      }
    });
  }

  // 회차를 조회하여 받아온 회차 위닝 번호를 html에 추가해줍니다.
  _choiceNumber(e) {
    e.preventDefault();
    const num = select.value;

    //ajax를 이용하여 입력한 회차 값을 서버로 보내줍니다.
    xhr.open("GET", "http://localhost:3000/lottos/" + num);
    xhr.send();
    xhr.onload = () => {
      let dataN = JSON.parse(xhr.response);
      let choiceN = [];
      let ballN = [0, 1, 2, 3, 4, 5, 6, 7];

      if (dataN) {
        choiceN.push(dataN.drwtNo1);
        choiceN.push(dataN.drwtNo2);
        choiceN.push(dataN.drwtNo3);
        choiceN.push(dataN.drwtNo4);
        choiceN.push(dataN.drwtNo5);
        choiceN.push(dataN.drwtNo6);
      }
      // //받아온 번호 테스트
      // console.log(dataN.drwtNo3);

      //받아온 정보를 html에 추가해줍니다.
      if (dataN) {
        let html = `
      <div id="choiceNumber" class="choice-number">
          <span class="ball" id = balls-${ballN[0]} >${choiceN[0]}</span>
          <span class="ball" id = balls-${ballN[1]} >${choiceN[1]}</span>
          <span class="ball" id = balls-${ballN[2]} >${choiceN[2]}</span>
          <span class="ball" id = balls-${ballN[3]} >${choiceN[3]}</span>
          <span class="ball" id = balls-${ballN[4]} >${choiceN[4]}</span>
          <span class="ball" id = balls-${ballN[5]} >${choiceN[5]}</span>
          <span class="ball ball-plus">+</span>
          <span class="ball" span id="balls-num">${dataN.bnusNo}</span>
      </div>
    

          `;

        select.insertAdjacentHTML("afterend", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }

      //for if문을 이용하여 숫자별로 색상을 정해줍니다.
      for (let i = 0; i < 6; i++) {
        if (choiceN[i] <= 10) {
          document
            .getElementById(`balls-${ballN[i]}`)
            .classList.add("ball-yello");
        } else if (choiceN[i] > 10 && choiceN[i] <= 20) {
          document
            .getElementById(`balls-${ballN[i]}`)
            .classList.add("ball-blue");
        } else if (choiceN[i] > 20 && choiceN[i] <= 30) {
          document
            .getElementById(`balls-${ballN[i]}`)
            .classList.add("ball-red");
        } else if (choiceN[i] > 30 && choiceN[i] <= 40) {
          document
            .getElementById(`balls-${ballN[i]}`)
            .classList.add("ball-gray");
        } else {
          document
            .getElementById(`balls-${ballN[i]}`)
            .classList.add("ball-green");
        }
      }
      if (dataN.bnusNo <= 10) {
        document.getElementById("balls-num").classList.add("ball-yello");
      } else if (dataN.bnusNo > 10 && dataN.bnusNo <= 20) {
        document.getElementById(`balls-num`).classList.add("ball-blue");
      } else if (dataN.bnusNo > 20 && dataN.bnusNo <= 30) {
        document.getElementById(`balls-num`).classList.add("ball-red");
      } else if (dataN.bnusNo > 30 && dataN.bnusNo <= 40) {
        document.getElementById(`balls-num`).classList.add("ball-gray");
      } else {
        document.getElementById(`balls-num`).classList.add("ball-green");
      }
    };
  }

  // 서버에서 최신 회차 번호를 받아와서 출력합니다.
  _getNumber() {
    axios.get("http://localhost:3000/lottos/last").then((res) => {
      let data = res.data;

      let getN = [];
      if (data) {
        getN.push(data.drwtNo1);
        getN.push(data.drwtNo2);
        getN.push(data.drwtNo3);
        getN.push(data.drwtNo4);
        getN.push(data.drwtNo5);
        getN.push(data.drwtNo6);
      }

      let ball = [0, 1, 2, 3, 4, 5, 6];

      if (data) {
        let html = `
          <div class="section section1">
            <div>
                <span class="section1-text">
                  <strong class="drw-no" style="display:inline">${data.drwNo}회</strong>당첨결과
                  <br>
                  (${data.drwNoDate})
                </span>
            </div>
            <div class="winning-number">
                  <span class="ball" id = ball-${ball[0]}>${getN[0]}</span>
                  <span class="ball" id = ball-${ball[1]}>${getN[1]}</span>
                  <span class="ball" id = ball-${ball[2]}>${getN[2]}</span>
                  <span class="ball" id = ball-${ball[3]}>${getN[3]}</span>
                  <span class="ball" id = ball-${ball[4]}>${getN[4]}</span>
                  <span class="ball" id = ball-${ball[5]}>${getN[5]}</span>
                  <span class="ball ball-plus">+</span>
                  <span class="ball "id="ball-num">${data.bnusNo}</span>
            </div>  
            <div>
              <img src="./down-arrow.svg">
            </div>
          </div>

          `;
        home.insertAdjacentHTML("afterend", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }

      //for if문을 이용하여 숫자별로 색상을 정해줍니다.
      for (let i = 0; i < 6; i++) {
        if (getN[i] <= 10) {
          document
            .getElementById(`ball-${ball[i]}`)
            .classList.add("ball-yello");
        } else if (getN[i] > 10 && getN[i] <= 20) {
          document.getElementById(`ball-${ball[i]}`).classList.add("ball-blue");
        } else if (getN[i] > 20 && getN[i] <= 30) {
          document.getElementById(`ball-${ball[i]}`).classList.add("ball-red");
        } else if (getN[i] > 30 && getN[i] <= 40) {
          document.getElementById(`ball-${ball[i]}`).classList.add("ball-gray");
        } else {
          document
            .getElementById(`ball-${ball[i]}`)
            .classList.add("ball-green");
        }
      }

      //보너스 번호는 따로 ball-bonus로 id를 지정한뒤 구현했습니다.
      if (data.bnusNo <= 10) {
        document.getElementById("ball-num").classList.add("ball-yello");
      } else if (data.bnusNo > 10 && data.bnusNo <= 20) {
        document.getElementById(`ball-num`).classList.add("ball-blue");
      } else if (data.bnusNo > 20 && data.bnusNo <= 30) {
        document.getElementById(`ball-num`).classList.add("ball-red");
      } else if (data.bnusNo > 30 && data.bnusNo <= 40) {
        document.getElementById(`ball-num`).classList.add("ball-gray");
      } else {
        document.getElementById(`ball-num`).classList.add("ball-green");
      }
    });
  }
}

//자동 번호 생성기입니다.
class MakeNumber {
  constructor() {
    button.addEventListener("click", this._makeNumber.bind(this));
    // this._makeNumber();
  }

  _makeNumber() {
    const lotto = [];

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
    const lottoN = lotto.slice(0, 6);
    let ballS = [0, 1, 2, 3, 4, 5, 6];

    lottoN.sort((a, b) => {
      return a - b;
    });

    let html = `
        <div class="auto-number">
          <span id = "ball0" class="ball">${lottoN[0]}</span>
          <span id = "ball1" class="ball">${lottoN[1]}</span>
          <span id = "ball2" class="ball">${lottoN[2]}</span>
          <span id = "ball3" class="ball">${lottoN[3]}</span>
          <span id = "ball4" class="ball">${lottoN[4]}</span>
          <span id = "ball5" class="ball">${lottoN[5]}</span>
          <span class="ball ball-plus">+</span>
          <span id = "ball-bonus" class="ball"> ${lotto[6]}</span>
      </div>
        `;

    button.insertAdjacentHTML("afterend", html);

    //생성된 번호의 색상을 넣어줬습니다.
    for (let i = 0; i < 6; i++) {
      if (lottoN[i] <= 10) {
        document.getElementById(`ball${[i]}`).classList.add("ball-yello");
      } else if (lottoN[i] > 10 && lottoN[i] <= 20) {
        document.getElementById(`ball${[i]}`).classList.add("ball-blue");
      } else if (lottoN[i] > 20 && lottoN[i] <= 30) {
        document.getElementById(`ball${[i]}`).classList.add("ball-red");
      } else if (lottoN[i] > 30 && lottoN[i] <= 40) {
        document.getElementById(`ball${[i]}`).classList.add("ball-gray");
      } else {
        document.getElementById(`ball${[i]}`).classList.add("ball-green");
      }
    }

    //보너스 번호는 따로 ball-bonus로 id를 지정한뒤 구현했습니다.
    if (lotto[6] <= 10) {
      document.getElementById(`ball-bonus`).classList.add("ball-yello");
    } else if (lotto[6] > 10 && lotto[6] <= 20) {
      document.getElementById(`ball-bonus`).classList.add("ball-blue");
    } else if (lotto[6] > 20 && lotto[6] <= 30) {
      document.getElementById(`ball-bonus`).classList.add("ball-red");
    } else if (lotto[6] > 30 && lotto[6] <= 40) {
      document.getElementById(`ball-bonus`).classList.add("ball-gray");
    } else {
      document.getElementById(`ball-bonus`).classList.add("ball-green");
    }
  }
}

// ---------------------------------------------------------------

//판매처 위치를 구현했습니다.
class Map {
  constructor() {
    // this._getMap();
    this._getPosition();
  }

  //geolocationd을 이용하여 위치정보를 가저왔습니다.
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._getMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  //받은 geolocationd의 coords위치를 가지고 구글맵을 이용하여 구현했습니다.
  _getMap(position) {
    // navigator.geolocation.getCurrentPosition();
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 13,
      mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            // icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    // marker의 디테일 정보 소스, 위의 마커와 같이 구현하지를 못하고 있습니다.
    // const request = {
    //   placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    //   fields: ["name", "formatted_address", "place_id", "geometry"],
    // };
    // const infowindow = new google.maps.InfoWindow();
    // const service = new google.maps.places.PlacesService(map);

    // service.getDetails(request, (place, status) => {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     // const marker = new google.maps.Marker({
    //     //   map,
    //     //   position: place.geometry.location,
    //     // });

    //     google.maps.event.addListener(markers, "click", () => {
    //       console.log("hi");
    //       const content = document.createElement("div");
    //       const nameElement = document.createElement("h2");

    //       nameElement.textContent = place.name;
    //       content.appendChild(nameElement);

    //       const placeIdElement = document.createElement("p");

    //       placeIdElement.textContent = place.place_id;
    //       content.appendChild(placeIdElement);

    //       const placeAddressElement = document.createElement("p");

    //       placeAddressElement.textContent = place.formatted_address;
    //       content.appendChild(placeAddressElement);
    //       infowindow.setContent(content);
    //       infowindow.open(map, markers);
    //     });
    //   }
    // });
  }
}

new App();
new MakeNumber();
// new Map();
