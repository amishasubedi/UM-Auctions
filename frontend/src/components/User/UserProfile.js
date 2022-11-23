import { Fragment } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <Fragment>
      <Link to="/profile">
        <h2>Works</h2>
      </Link>
    </Fragment>
  );
};

export default UserProfile;
