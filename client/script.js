"use strict";

const arrow = document.querySelector(".arrow");
const numbers = document.querySelector(".main");
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
      let dataN = JSON.parse(xhr.response);

      // //받아온 번호 테스트
      // console.log(dataN.drwtNo3);

      //받아온 정보를 html에 추가해줍니다.
      if (dataN) {
        let html = `
        <div class="text">
        <span id="ball" >${dataN.drwtNo1}</span>
        <span class="ball ">${dataN.drwtNo2}</span>
        <span class="ball ">${dataN.drwtNo3}</span>
        <span class="ball ">${dataN.drwtNo4}</span>
        <span class="ball ">${dataN.drwtNo5}</span>
        <span class="ball ">${dataN.drwtNo6}</span>
      <div class="bnus-num">${dataN.bnusNo}</div>
      </div>
          `;

        arrow.insertAdjacentHTML("afterend", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }
      if (dataN.drwtNo1 < 10) {
        console.log("hi");

        document.getElementById("ball").classList.add("ball-yello");
      }
    };
  }

  // 서버에서 최신 회차 번호를 받아와서 출력합니다.
  _getNumber() {
    axios.get("http://localhost:3000/lottos/last").then((res) => {
      const data = res.data;

      if (data) {
        let html = `
          <div class="winning-number">
          <span>${data.drwNoDate}</span>
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
        numbers.insertAdjacentHTML("beforebegin", html);
      } else {
        console.log("번호를 가져오지 못했습니다.");
      }
    });
  }
}

//자동 번호 생성기입니다.
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

    let html = `
        <div class="auto-number">
          <span id ="ball" >${lottoN[0]}</span>
          <span>${lottoN[1]}</span>
          <span>${lottoN[2]}</span>
          <span>${lottoN[3]}</span>
          <span>${lottoN[4]}</span>
          <span>${lottoN[5]}</span>
          <span>${"보너스" + lotto[6]}</span>
      </div>
        `;

    makeNumber.insertAdjacentHTML("afterend", html);

    if (lottoN[0] < 10) {
      console.log("hi");

      document.getElementById("ball").classList.add("ball-yello");
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
new Map();
