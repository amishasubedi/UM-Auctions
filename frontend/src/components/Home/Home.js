import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, handleErrors } from "../../redux/actions/product_actions";
import Product from "../BidItems/product";
import { useParams } from "react-router";

import LoadingSpinner from "../UI/LoadingSpinner";
import "./Home.css";

const Home = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageHandler = (page) => {
    setCurrentPage(page);
  };

  // fetch products to frontend
  const { loading, products, error, productsInPage, numberOfProducts } =
    useSelector((state) => state.products);

  const keyword = params.id;

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage));

    if (error) {
      dispatch(handleErrors);
    }
  }, [dispatch, error, keyword, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <h1 className="ml-3" id="products_heading">
            Latest Products
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>

          {/* implement pagination */}
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={productsInPage}
              totalItemsCount={numberOfProducts}
              onChange={setCurrentPageHandler}
              nextPageText={">"}
              prevPageText={"<"}
              firstPageText={"<<"}
              lastPageText={">>"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
