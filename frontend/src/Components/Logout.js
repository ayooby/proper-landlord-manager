import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";

import { UserContext } from "../Context/User";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    window.localStorage.removeItem("token");
    setUser({
      loggedIn: false,
      apartments: [],
      buildings: [],
      tenants: [],
    });
    setStatus("redirect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "redirect") return <Redirect to="/login" />;

  return (
    <div className="mt-4">
      <Spinner />
      <span className="ml-3">Logging you out...</span>
    </div>
  );
};

export default Logout;
