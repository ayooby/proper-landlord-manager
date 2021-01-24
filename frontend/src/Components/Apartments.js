import { useState, useContext } from "react";
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  ModalBody,
  Spinner,
} from "reactstrap";

import { UserContext } from "../Context/User";
import ApartmentForm from "./ApartmentForm";

const Apartments = ({ isLoading }) => {
  const { user } = useContext(UserContext);
  const [currentApartment, setApartment] = useState({});
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  return (
    <>
      <Card>
        <CardHeader>My Apartments</CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <ListGroup>
              {user.apartments.map((apartment) => (
                <ListGroupItem key={apartment.id}>
                  {apartment.number}
                  <Button
                    color="link"
                    onClick={() => {
                      setApartment(apartment);
                      toggleModal();
                    }}
                  >
                    Edit
                  </Button>
                  <ul>
                    <li>
                      <b>Address:</b> {apartment.address}
                    </li>
                  </ul>
                </ListGroupItem>
              ))}
              {user.apartments.length === 0 && (
                <ListGroupItem>No Entry!</ListGroupItem>
              )}
            </ListGroup>
          )}
        </CardBody>
        <CardFooter>
          <Button
            color="link"
            onClick={() => {
              setApartment({});
              toggleModal();
            }}
          >
            New Apartment
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <ApartmentForm
            initialValues={currentApartment}
            onFinish={toggleModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Apartments;
