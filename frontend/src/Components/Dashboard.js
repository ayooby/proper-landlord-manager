import { Col } from "reactstrap";
import Buildings from "./Buildings";
import { useEffect, useContext, useState } from "react";

import { UserContext } from "../Context/User";
import { authHeader } from "../util";
import Apartments from "./Apartments";
import Tenants from "./Tenants";
import { APARTMENTS, BUILDING, TENANTS } from "../api";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { setUser, user } = useContext(UserContext);

  const getBuildings = () =>
    fetch(BUILDING, {
      headers: authHeader(),
    }).then(async (res) => {
      if (res.ok) return await res.json();
      throw res.json();
    });

  const getApartments = () =>
    fetch(APARTMENTS, {
      headers: authHeader(),
    }).then(async (res) => {
      if (res.ok) return await res.json();
      throw res.json();
    });

  const getTenants = () =>
    fetch(TENANTS, {
      headers: authHeader(),
    }).then(async (res) => {
      if (res.ok) return await res.json();
      throw res.json();
    });

  useEffect(() => {
    Promise.all([getBuildings(), getApartments(), getTenants()]).then(
      ([buildings, apartments, tenants]) => {
        setLoading(false);
        setUser({
          ...user,
          buildings,
          tenants,
          apartments,
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Col md={4} className="mt-4">
        <Apartments isLoading={isLoading} />
      </Col>
      <Col md={4} className="mt-4">
        <Buildings isLoading={isLoading} />
      </Col>
      <Col md={4} className="mt-4">
        <Tenants isLoading={isLoading} />
      </Col>
    </>
  );
};

export default Dashboard;
