import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, handleErrors } from "../../actions/product_actions";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./ProductInfo.css";

const ProductInfo = (props) => {
  // const dispatch = useDispatch();
  // const { loading, productDetails, error } = useSelector(
  //   (state) => state.productDetails
  // );
  // useEffect(() => {
  //   dispatch(getProductDetails(props.params.id));

  //   if (error) {
  //     dispatch(handleErrors);
  //   }
  // }, [dispatch.apply, error, props.params.id]);

  return (
    <Fragment>
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" className="product_image">
          <img
            src="https://m.media-amazon.com/images/I/51qzmS082kL._SX522_.jpg"
            alt=""
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>"Apple AirPods Pro (2nd Generation) Wireless Earbuds</h3>
          <p className="product-title">Product uehfuohrf4u4</p>

          <div className="rating-outer">
            <div className="rating-inner"></div>
          </div>
          <span className="reviews">(Reviews: 5)</span>

          <p className="price">$17.99</p>

          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus">-</span>
            <input
              type="number"
              className="form-control count d-inline"
              value="1"
              readOnly
            />
            <span className="btn btn-primary plus">+</span>
          </div>

          <button
            type="button"
            id="cart_button"
            className="btn btn-primary d-inline ml-4"
          >
            Bid
          </button>

          <div>
            <p>
              Status: <span classname="availability">Available to Bid</span>
            </p>
          </div>

          <h4 class="mt-2">Description:</h4>
          <p>
            Up to 2X More Active Noise Cancelling, Adaptive Transparency,
            Personalized Spatial Audio, MagSafe Charging Case, Bluetooth
            Headphones for iPhone, SOUND ALL AROUND – Personalized Spatial Audio
            surrounds you in sound tuned just for you. It works with dynamic
            head tracking to immerse you deeper in music and movies
          </p>
          <div>
            <p id="product_seller mb-3">
              Sold by: <strong>Amisha</strong>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductInfo;
