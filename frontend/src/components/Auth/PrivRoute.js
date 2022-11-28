import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivRoute({ component: Component, ...rest }) {
  const { isAdmin, isAuthenticated, loading, user } = useSelector(
    (state) => state.auth
  );

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/login" replace />;
            }
            if (isAdmin === true && user.role != "admin") {
              return <redirect to="/" />;
            }
            return <Component {...props} replace />;
          }}
        />
      )}
    </Fragment>
  );
}
