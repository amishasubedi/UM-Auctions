import React, { Fragment } from "react";
import "./ProductInfo.css";

const MyBid = () => {
  return (
    <Fragment>
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="col-12 col-lg-7 mt-0">
            <h3 className="name">Television</h3>
            <p id="product_id">12345678</p>

            <hr />
          </div>
          <p>Your Bid</p>
          <div class="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff"
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <hr />
          <h6>Bid Start: 11/26/2022</h6>
          <h6>Bid End: 11/28/2022</h6>
          <hr />

          <h4 className="mt-2" id="des">
            Description:
          </h4>
          <p>Television for your home</p>
          <hr />
          <p id="product_seller mb-3">Sold by: Test</p>
        </div>

        <p id="product_price" className="price">
          Min Price: 299.99
        </p>
      </div>
    </Fragment>
  );
};

export default MyBid;
