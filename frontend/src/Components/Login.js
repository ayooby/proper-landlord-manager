import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Alert,
  Col,
} from "reactstrap";
import { LOGIN, VALIDATE_USER } from "../api";
import { UserContext } from "../Context/User";

const Login = () => {
  const [status, setStatus] = useState("init");
  const [error, setError] = useState("");
  const { setUser, user } = useContext(UserContext);

  const loginUser = (key = null) => {
    key && window.localStorage.setItem("token", key);
    setUser({ ...user, loggedIn: true });
    setStatus("redirect");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    fetch(LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(async (res) => ({ ok: res.ok, data: await res.json() }))
      .then((res) => {
        if (!res.ok) {
          setStatus("error");
          setError(res.data);
          return;
        }
        loginUser(res.data.key);
      });
  };

  const userToken = window.localStorage.getItem("token");

  const checkUserByToken = async (token) => {
    fetch(VALIDATE_USER, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(async (res) => ({
        ok: res.ok,
        data: await res.json(),
      }))
      .then((res) => {
        if (res.ok) {
          loginUser();
          return;
        }
        window.localStorage.removeItem("token");
        setStatus("login");
      });
  };

  useEffect(() => {
    if (userToken) {
      checkUserByToken(userToken);
      return;
    }
    setStatus("login");
  }, []);

  if (status === "init") return <CheckingAccount />;

  if (status === "redirect") return <Redirect to="/dashboard" />;

  return (
    <Col md={8} className="mt-4">
      <Card className="p-2">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          {status === "error" && (
            <p className="text-danger">{Object.values(error).join("/n")}</p>
          )}
          <Button>Login</Button>
        </Form>
      </Card>
    </Col>
  );
};

const CheckingAccount = () => (
  <Alert color="info">Checking your account...</Alert>
);

export default Login;
