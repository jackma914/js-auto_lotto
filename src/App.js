import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Live from "./pages/Live";
import { db } from "./firebase";

function App() {
  // 유튜브 초기화면 포스트글들
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot) => {
  //     setPosts(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/upload" component={Upload} />
          <Route path="/live" component={Live} />
          <Route>
            <Header />
            <Sidebar />
            <Section />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
