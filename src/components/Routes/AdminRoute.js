import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const AdminRoute = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = localStorage.getItem("SLIBRARY:token");

  const User = JSON.parse(ok);
  localStorage.removeItem("SLIBRARY:redirect");
  localStorage.removeItem("SLIBRARY:redirect");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok && User.level === 2 ? (
          <Component {...props} />
        ) : path === "/user/:id" ? (
          <Redirect to={`/login?path=${location.pathname}`} />
        ) : (
          <Redirect to={`/private?path=${location.pathname}`} />
        )
      }
    />
  );
};

export default withRouter(AdminRoute);
