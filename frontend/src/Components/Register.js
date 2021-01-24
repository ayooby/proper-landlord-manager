import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, Card, Spinner } from "reactstrap";
import { REGISTER } from "../api";

const Register = () => {
  const [status, setStatus] = useState("init");
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({})
    setStatus('loading')
    const { username, password1, password2 } = e.target;
    fetch(REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password1: password1.value,
        password2: password2.value,
      }),
    })
      .then(async (res) => ({
        ok: !res.ok,
        data: await res.json(),
      }))
      .then((res) => {
        if (!res.ok) {
          setError(res.data);
          setStatus("error");
          return;
        }
        setStatus("redirect");
      });
  };

  if (status === "redirect") return <Redirect to="/login" />;

  return (
    <Col md={8} className="mt-4">
      <Card className="p-2">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              required
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </FormGroup>
          {error.username && (
            <p className="text-danger">
              {Object.values(error.username).map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </p>
          )}
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              required
              type="password"
              name="password1"
              id="password1"
              placeholder="password"
            />
          </FormGroup>
          {error.password1 && (
            <p className="text-danger">
              {Object.values(error.password1).map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </p>
          )}
          <FormGroup>
            <Label for="password2">Confirm Password</Label>
            <Input
              required
              type="password"
              name="password2"
              id="password2"
              placeholder="password"
            />
          </FormGroup>
          {error.password2 && (
            <p className="text-danger">
              {Object.values(error.password2).map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </p>
          )}
          <Button disabled={status==='loading'}>Register {status === 'loading' && (
            <Spinner size="sm"/>
          )}</Button>
        </Form>
      </Card>
    </Col>
  );
};

export default Register;
