import { useContext } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { UserContext } from "../Context/User";

const SideBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading">Landlord Manager</div>
      <ListGroup>
        <ListGroupItem tag="a" href="/">
          Home
        </ListGroupItem>
        {user.loggedIn ? (
          <ListGroupItem tag="a" href="/dashboard">
            Dashboard
          </ListGroupItem>
        ) : (
          <ListGroupItem tag="a" href="/register">
            Register
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
};

export default SideBar;
