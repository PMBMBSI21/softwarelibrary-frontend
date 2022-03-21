import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const MemberRoute = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = localStorage.getItem("SLIBRARY:token");

  localStorage.removeItem("SLIBRARY:redirect");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? (
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

export default withRouter(MemberRoute);
