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
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

import { BUILDING } from "../api";
import { authHeader } from "../util";
import { UserContext } from "../Context/User";

const Buildings = ({ isLoading }) => {
  const { setUser, user } = useContext(UserContext);
  const [status, setStatus] = useState("loading");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    const { name, address, number } = e.target;
    const result = await fetch(BUILDING, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        name: name.value,
        address: address.value,
        number: number.value,
      }),
    }).then(async (res) => ({
      error: !res.ok,
      data: await res.json(),
    }));

    if (result.error) {
      setError(result.data);
      return;
    }
    setUser({
      ...user,
      buildings: [...user.buildings, result.data],
    });
    toggleModal();
  };

  return (
    <>
      <Card>
        <CardHeader>My Buildings</CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <ListGroup>
              {user.buildings.map((building) => (
                <ListGroupItem key={building.id}>{building.name}</ListGroupItem>
              ))}
              {user.buildings.length === 0 && (
                <ListGroupItem>No Entry!</ListGroupItem>
              )}
            </ListGroup>
          )}
        </CardBody>
        <CardFooter>
          <Button color="link" onClick={toggleModal}>
            New Building
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="number">Number</Label>
              <Input
                required
                type="text"
                name="number"
                id="number"
                placeholder="Number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                required
                type="text"
                name="address"
                id="address"
                placeholder="Address"
              />
            </FormGroup>
            {error && <p className="text-danger">{error.msg}</p>}
            <Button disabled={status === "saving"}>
              Save {status === "saving" && <Spinner size="sm" />}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Buildings;
