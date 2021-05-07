import React from "react";
import { Redirect, Route } from "react-router-dom";
import { tokenName } from "./constant";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const authorize = localStorage.getItem(tokenName)

  return (
    <Route
      {...rest}
      render={(props) =>
        authorize  ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRouter;