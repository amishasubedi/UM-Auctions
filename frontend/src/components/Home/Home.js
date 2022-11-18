import React from "react";
import { Fragment } from "react";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
                alt="item1"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a>128GB Solid Storage Memory card - SanDisk Ultra</a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text"> Min Price: $45.67</p>
                <a id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://m.media-amazon.com/images/I/61B04f0ALWL._AC_UY218_.jpg"
                alt="item2"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a>
                    Wyze Cam 1080p HD Indoor Wireless Smart Home Camera Wyze Cam
                    1080p HD Indoor Wireless Smart Home Camera
                  </a>
                </h5>
                <div className="ratings mt-auto">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <i className="fa fa-star-o"></i>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">Min Price: $965.67</p>
                <a id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
