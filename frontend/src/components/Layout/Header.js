import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ProductSearch from "../BidItems/ProductSearch";
import "./Header.css";

const Header = () => {
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
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
