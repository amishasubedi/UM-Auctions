import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts, handleErrors } from "../../actions/product_actions";
import Product from "../BidItems/product";
import LoadingSpinner from "../UI/LoadingSpinner";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Home.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const params = useParams();
  const [currentPage, setCurrentpage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const dispatch = useDispatch();

  // page number of items
  const setCurrentPageHandler = (page_num) => {
    setCurrentpage(page_num);
  };
  // fetch products to frontend
  const { loading, products, numberOfProducts, error, productsInPage } =
    useSelector((state) => state.products);

  const keyword = params.keyword;

  // load the component only when the given dependency changes
  useEffect(() => {
    console.log(products);
    dispatch(fetchProducts(keyword, currentPage, price));

    if (error) {
      dispatch(handleErrors);
    }
  }, [dispatch, error, currentPage, keyword, price]);

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
