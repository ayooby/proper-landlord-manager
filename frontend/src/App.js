import { useState } from "react";
import { Container, Row } from "reactstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";
import { UserContext } from "./Context/User";
import TopBar from "./Components/TopBar";
import SideBar from "./Components/SideBar";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    apartments: [],
    buildings: [],
    tenants: [],
  });

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="d-flex" id="wrapper">
          <SideBar />
          <div id="page-content-wrapper">
            <TopBar />
            <Container>
              <Row className="justify-content-center">
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/logout">
                  <Logout />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/dashboard">
                  {user.loggedIn ? <Dashboard /> : <Redirect to="login" />}
                </Route>
                <Route exact={true} path="/">
                  <Home />
                </Route>
              </Row>
            </Container>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
