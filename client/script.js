"use strict";

axios.get("http://localhost:3000/lottos/last").then((res) => {
  const data = res.data;
  if (data) {
    console.log(data);
  } else error;
  console.log(error);
});
