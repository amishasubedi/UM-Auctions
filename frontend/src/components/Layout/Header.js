import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductSearch from "../BidItems/ProductSearch";
import { logoutUser } from "../../redux/actions/user_actions";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert("logged out successfully");
  };
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <h2 className="header">UMAuctions</h2>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <ProductSearch />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              {" "}
              <Link
                to="#!"
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <div>Hello {user && user.name}</div>
                  <span>Accounts&List</span>
                </div>
              </Link>{" "}
              {/* // create drop down menu for user */}
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role !== "admin" ? (
                  <Link className="dropdown-item" to="/orders/myOrder">
                    MyBid
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}

                <Link className="dropdown-item" to="/myprofile">
                  Profile
                </Link>

                <Link className="dropdown-item" to="/new/auction">
                  Auction
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
