import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

const product = ({ product }) => {
  const imageArray = product.images;
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          // src="https://images-na.ssl-images-amazon.com/images/I/41CRnvYqmqL._AC_SR400,600_.jpg"
          src={product.images[0].url}
          alt=""
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <div className="ratings mt-auto">
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            </div>
          </div>
          <p className="card-text">Minprice: {product.price}</p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default product;
