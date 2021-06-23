import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <Header />
            <Sidebar />
            <Section />
            {posts.map((post) => (
              <Post
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
            {/* <Post username="sim" caption="dope" imageUrl="./logo192.png" /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
