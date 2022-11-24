import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Carousel } from "react-bootstrap";
import {
  getProductDetails,
  handleErrors,
} from "../../redux/actions/product_actions";
import "./ProductInfo.css";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(params.id));

    if (error) {
      dispatch(handleErrors());
    }
  }, [dispatch, params.id, error]);

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
                Status: <span id="stock_status">Available to Bid</span>
              </p>
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
              <p id="product_seller mb-3">Sold by: {product.seller}</p>
            </div>

            <p id="product_price" className="price">
              Last Bid: $ {product.price}
            </p>

            <div className="row mt-3 ">
              <div className="rating w-50 mt-3"></div>
              <div className="form">
                <label htmlFor="email_field">Your bid ($)</label>
                <input
                  type="number"
                  id="bid_field"
                  className="content"
                  name="name"
                />
                <p className="paragraph">{`(Enter ${
                  product.price + 1
                } or more)`}</p>
              </div>
            </div>
            <hr />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductInfo;
