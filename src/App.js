import React, { Component } from "react";
import "./App.css";
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Content from "./components/Content";
import Control from "./components/Control";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World wide web!" },
      welcome: { title: "Welcome", desc: "hello , react!!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is hypertext..." },
        { id: 2, title: "CSS", desc: "css is hypertext..." },
        { id: 3, title: "JS", desc: "js is hypertext..." },
      ],
    };
  }

  render() {
    let _title,
      _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      let i = 0;
      while (i < this.state.contents.length) {
        const data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            alert("hihihi");
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>

        <TOC
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: +id });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            this.setState({
              mode: _mode,
            });
          }.bind(this)}
        ></Control>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
