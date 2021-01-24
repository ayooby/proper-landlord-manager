import { useState, useContext } from "react";
import { Form, FormGroup, Input, Label, Button, Spinner } from "reactstrap";

import { APARTMENTS } from "../api";
import { UserContext } from "../Context/User";
import { authHeader } from "../util";

const ApartmentForm = ({ initialValues = {}, onFinish }) => {
  const { setUser, user } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [error, setError] = useState({});

  const handleCreate = async (form) => {
    const { number, building_id, address } = form;
    const result = await fetch(APARTMENTS, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        number: number.value,
        address: address.value,
        building_id: building_id.value,
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
      apartments: [...user.apartments, result.data],
    });
    onFinish();
  };

  const handleUpdate = async (form) => {
    const { number, building_id, address } = form;
    const result = await fetch(`${APARTMENTS}${initialValues.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        number: number.value,
        address: address.value,
        building_id: building_id.value,
      }),
    }).then(async (res) => ({
      error: !res.ok,
      data: await res.json(),
    }));

    if (result.error) {
      setStatus('error')
      setError(result.data);
      return;
    }
    setUser({
      ...user,
      apartments: user.apartments.map((apartment) => {
        if (apartment.id === result.data.id) return result.data;
        return apartment;
      }),
    });
    onFinish();
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("saving");

        if (initialValues.id) return handleUpdate(e.target);
        return handleCreate(e.target);
      }}
    >
      <FormGroup>
        <Label for="number">Number</Label>
        <Input
          defaultValue={initialValues.number}
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
          defaultValue={initialValues.address}
          type="text"
          name="address"
          id="address"
          placeholder="Address"
        />
      </FormGroup>
      <FormGroup>
        <Label for="building">Building</Label>
        <Input
          defaultValue={initialValues?.building?.id}
          required
          type="select"
          name="building_id"
          id="building"
        >
          <option value="">-----</option>
          {user.buildings.map((building) => (
            <option value={building.id} key={`buidling_${building.id}`}>
              {building.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      {error && <p className="text-danger">{error.msg}</p>}
      <Button>Save {status === "saving" && <Spinner size="sm" />}</Button>
    </Form>
  );
};

export default ApartmentForm;
