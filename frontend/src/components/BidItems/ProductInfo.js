import React, { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Carousel } from "react-bootstrap";
import {
  getProductDetails,
  handleErrors,
} from "../../redux/actions/product_actions";
import "./ProductInfo.css";
import { allUsers } from "../../redux/actions/user_actions";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const params = useParams();
  const [placed, setPlaced] = useState(false);
  const [input, setInput] = useState();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Before bid", placed);
    dispatch(getProductDetails(params.id));
    dispatch(allUsers(params.id));

    if (error) {
      dispatch(handleErrors());
    }
  }, [dispatch, params.id, error]);

  const inputChangeHandler = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const bidSubmitHandler = () => {
    alert("Successfully placed the bid");
    setPlaced(true);
  };
  console.log("After bid", placed);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <div className="col-12 col-lg-7 mt-0">
                <h3 className="name">{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />
              </div>
              <p>
                Status:{" "}
                <span id="stock_status">
                  {product.stock > 0
                    ? "Available to bid"
                    : "Bid Ended for this product"}
                </span>
              </p>
              {product.stock === 0 && (
                <span>
                  Test 2 won the bid at ${(product.price + 76).toFixed(2)}{" "}
                </span>
              )}

              {/* to handle multiple images */}
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        id="product_image"
                        className="d-block"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
              <hr />

              <h4 className="mt-2" id="des">
                Description:
              </h4>
              <p>{product.description}</p>
              <hr />

              <h3>
                Bid Start:{" "}
                {product.bidStart
                  ? product.bidStart.toString().split("T")[0]
                  : product.bidStart}
              </h3>
              <h3>
                Bid End:{" "}
                {product.bidEnd
                  ? product.bidEnd.toString().split("T")[0]
                  : product.bidEnd}
              </h3>

              <hr />

              <p id="product_seller mb-3">Sold by: {product.seller}</p>
            </div>

            <div id="product_price" className="price">
              Minimum Price: $ {product.price}
              {product.stock > 0 && (
                <div className="row mt-2 ">
                  <div className="rating w-50 mt-2"></div>
                  <div className="form">
                    <label htmlFor="email_field">Your bid ($)</label>
                    <input
                      type="number"
                      id="bid_field"
                      className="content"
                      onChange={inputChangeHandler}
                    />

                    <button
                      type="submit"
                      ref={inputRef}
                      id="bid_button"
                      onClick={bidSubmitHandler}
                    >
                      Place Bid
                    </button>
                    <p className="paragraph">{`(Enter ${
                      product.price + 1
                    } or more)`}</p>

                    <div> ALL BIDS: </div>
                    <hr />

                    {placed && (
                      <span>
                        {user.name} Bidded ${input}
                      </span>
                    )}
                    <hr />

                    <span>Test2 Bidded ${(product.price + 45).toFixed(2)}</span>
                    <hr />
                    <span>Test2 Bidded ${(product.price + 17).toFixed(2)}</span>
                    <hr />
                    <span>SSDSD Bidded ${(product.price + 28).toFixed(2)}</span>
                    <hr />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductInfo;
