// If user is loggedin, they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.authReducer);
  // const isLoggedIn = Cookies.getItem("JWT");

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
