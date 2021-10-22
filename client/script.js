import axios from "axios";

axios.get("http://localhost:5000/lottos/last").then((res) => {
  const data = res.data;
  if (data) {
    const lottoNumber = [];
    lottoNumber.push(data.drwtNo1);
    lottoNumber.push(data.drwtNo2);
    lottoNumber.push(data.drwtNo3);
    lottoNumber.push(data.drwtNo4);
    lottoNumber.push(data.drwtNo5);
    lottoNumber.push(data.drwtNo6);
    lottoNumber.push(data.bnusNo);
    this.setState({ lottoNumber, drwNo: data.drwNo });
  }
});
console.log(lottoNumber);
