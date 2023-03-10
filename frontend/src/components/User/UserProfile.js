import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./UserProfile.css";

const UserProfile = () => {
  const { loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Fragment>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                <Link
                  to="/myProfile/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Address</h4>
                <p>{user.address}</p>

                {user.role !== "admin" && (
                  <Link
                    to="/orders/myOrder"
                    className="btn btn-danger btn-block mt-5"
                  >
                    My Bids
                  </Link>
                )}

                <Link
                  to="/password/update"
                  className="btn btn-primary btn-block mt-3"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

export default UserProfile;
