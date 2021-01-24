import { useContext, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from "reactstrap";

import { UserContext } from "../Context/User";

const TopBar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/" className="mr-auto">
        Proper
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="w-100" navbar>
          <NavItem className={`${user.loggedIn && "ml-auto"}`}>
            {user.loggedIn ? (
              <NavLink href="/logout">Logout</NavLink>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopBar;
