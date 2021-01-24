import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { UserContext } from "../Context/User";

test("render home page", () => {
  const user = { loggedIn: false };
  render(
    <UserContext.Provider value={{ user }}>
      <Home />
    </UserContext.Provider>
  );
  const linkElement = screen.getByText('Register');
  expect(linkElement).toBeInTheDocument();
});

test("show dashboard button when user is logged in", () => {
  const user = { loggedIn: true };
  render(
    <UserContext.Provider value={{ user }}>
      <Home />
    </UserContext.Provider>
  );
  const linkElement = screen.getByText('Dashboard');
  expect(linkElement).toBeInTheDocument();
});
