import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>hello world</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

function FuncComp(props) {
  const numberState = useState(props.initNumber);
  const number = numberState[0];
  const setNumber = numberState[1];

  // const dateState = useState(new Date().toString());
  // const _date = dateState[0];
  // const setDate = dateState[1];

  const [_date, setDate] = useState(new Date().toString());

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      />
      <p>date : {_date}</p>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      />
    </div>
  );
}

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    _date: new Date().toString(),
  };
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        />
        <p>Date : {this.state._date}</p>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ _date: new Date().toString() });
          }.bind(this)}
        />
      </div>
    );
  }
}

export default App;
