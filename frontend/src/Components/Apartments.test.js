import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Apartments from "./Apartments";
import ApartmentForm from "./ApartmentForm";
import { UserContext } from "../Context/User";

const fakeSetUser = () => jest.fn();

jest.mock("./ApartmentForm");

test("render loading spinner", () => {
  const user = { loggedIn: true, buildings: [] };
  render(
    <UserContext.Provider value={{ user }}>
      <Apartments isLoading={true} />
    </UserContext.Provider>
  );
  const linkElement = screen.getByRole("status");
  expect(linkElement).toBeInTheDocument();
});

test("render list of apartments", () => {
  const testApartment = { id: 123, number: 666, address: "hell is address" };
  const user = { loggedIn: true, buildings: [], apartments: [testApartment] };
  render(
    <UserContext.Provider value={{ user, setUser: fakeSetUser }}>
      <Apartments isLoading={false} />
    </UserContext.Provider>
  );
  const apartmentNo = screen.getByText(testApartment.number);
  const apartmentAddress = screen.getByText(testApartment.number);

  expect(apartmentAddress).toBeInTheDocument();
  expect(apartmentNo).toBeInTheDocument();
});

test("render no apartment", () => {
  const user = { loggedIn: true, buildings: [], apartments: [] };
  render(
    <UserContext.Provider value={{ user }}>
      <Apartments isLoading={false} />
    </UserContext.Provider>
  );
  const linkElement = screen.getByText("No Entry!");
  expect(linkElement).toBeInTheDocument();
});

test("creating new apartment", async () => {
  const user = { loggedIn: true, buildings: [], apartments: [] };
  ApartmentForm.mockReturnValue(jest.fn())
  render(
    <UserContext.Provider value={{ user, setUser: fakeSetUser }}>
      <Apartments isLoading={false} />
    </UserContext.Provider>
  );

  userEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    screen.getByRole("dialog");
  });
  expect(ApartmentForm).toHaveBeenCalled();
});
