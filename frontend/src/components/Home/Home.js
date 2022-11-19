import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/product_actions";
import Product from "../BidItems/product";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  // fetch products to frontend
  const { loading, products, numberOfProducts, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

{
  /* <section id="products" classNameName="container mt-5">
        <div classNameName="row">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                classNameName="col-sm-12 col-md-6 col-lg-3 my-3"
              >
                <div classNameName="card p-3 rounded">
                  <img
                    classNameName="card-img-top mx-auto"
                    src="https://m.media-amazon.com/images/I/41iWogJnZQL._AC_SY240_.jpg"
                    alt="item1"
                  />

                  <div classNameName="card-body d-flex flex-column">
                    <h5 classNameName="card-title">
                      <a href="">{product.name}</a>
                    </h5>
                    <div classNameName="ratings mt-auto">
                      <div classNameName="rating-outer">
                        <div classNameName="rating-inner"></div>
                      </div>
                      <span id="no_of_reviews">(5 Reviews)</span>
                    </div>
                    <p classNameName="card-text"> Min Price: $45.67</p>
                    <a id="view_btn" classNameName="btn btn-block">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section> */
}
