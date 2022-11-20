import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, handleErrors } from "../../actions/product_actions";
import Product from "../BidItems/product";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  // fetch products to frontend
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());

    if (error) {
      dispatch(handleErrors);
    }
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
