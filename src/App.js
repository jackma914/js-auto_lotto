import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";

// import Login from "./components/pages/Login";
// import Home from "./pages";

function App() {
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
