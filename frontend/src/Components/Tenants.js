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

import { TENANTS } from "../api";
import { authHeader } from "../util";
import { UserContext } from "../Context/User";

const Tenants = ({ isLoading }) => {
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState("loading");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const toggleModal = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    const { name, mobile, email, apartment_id, is_active } = e.target;
    const result = await fetch(TENANTS, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        name: name.value,
        mobile: mobile.value,
        email: email.value,
        is_active: is_active.value,
        apartment_id: apartment_id.value,
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
      tenants: [...user.tenants, result.data],
    });
    toggleModal();
  };

  return (
    <>
      <Card>
        <CardHeader>Tenants</CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <ListGroup>
              {user.tenants.map((tenant) => (
                <ListGroupItem key={tenant.id}>
                  {tenant.name}
                  <ul>
                    <li>
                      <b>Mobile:</b> {tenant.mobile}
                    </li>
                    <li>
                      <b>Email:</b> {tenant.email}
                    </li>
                    <li>
                      <b>Apartment:</b> {tenant.apartment.number}
                    </li>
                  </ul>
                </ListGroupItem>
              ))}
              {user.tenants.length === 0 && (
                <ListGroupItem>No Entry!</ListGroupItem>
              )}
            </ListGroup>
          )}
        </CardBody>
        <CardFooter>
          <Button color="link" onClick={toggleModal}>
            Add Tenant
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
              <Label for="email">Email</Label>
              <Input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="mobile">Mobile</Label>
              <Input
                required
                type="number"
                name="mobile"
                id="mobile"
                placeholder="Mobile"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Apartment">Apartment</Label>
              <Input required type="select" name="apartment_id" id="Apartment">
                <option value="">-----</option>
                {user.apartments.map((apartment) => (
                  <option
                    value={apartment.id}
                    key={`apartment_${apartment.id}`}
                  >
                    {apartment.number}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup check>
              <Label for="is_active" check>
                <Input
                  required
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                />
                Active
              </Label>
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

export default Tenants;
