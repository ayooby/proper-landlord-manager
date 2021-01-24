import { useContext } from "react";
import { Button, Jumbotron } from "reactstrap";

import { UserContext } from "../Context/User";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Jumbotron>
      <h1>Welcome to simple landlord manager web-app</h1>
      <p>
        To start please click on {" "}
        {user.loggedIn ? (
          <Button color="link" href="/dashboard" className="p-0 m-0">
            Dashboard
          </Button>
        ) : (
          <Button color="link" href="/register" className="p-0 m-0">
            Register
          </Button>
        )}
        {" "}to get started.
      </p>
    </Jumbotron>
  );
};

export default Home;
