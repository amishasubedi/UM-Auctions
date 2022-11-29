import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../admin/SideBar";
import LoadingSpinner from "../UI/LoadingSpinner";
import { MDBDataTable } from "mdbreact";

import "./ProductInfo.css";

const MyBid = () => {
  const { loading, products } = useSelector((state) => state.products);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Your Bid Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Status",
          field: "stock",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price + 100}.toFixed(2) `,
        stock: product.stock > 100 ? "Win" : "Lost",
        actions: (
          <Fragment>
            <Link to={`/orders/myOrder`} className="btn btn-primary py-1 px-2">
              <i className="fa fa-pencil"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-10" style={{ margin: "auto" }}>
          <Fragment>
            <h1 className="my-5">My Bids</h1>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default MyBid;
