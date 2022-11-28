import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useNavigate } from "react-router";
import {
  deleteProduct,
  getAdminProducts,
  handleErrors,
} from "../../redux/actions/product_actions";
import Sidebar from "./SideBar";

import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { DELETE_PRODUCT_RESET } from "../../redux/reducers/product_constants";

const AllProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      dispatch(handleErrors());
    }

    if (deleteError) {
      dispatch(handleErrors());
    }

    if (isDeleted) {
      alert("Sucessfully deleted");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

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
          label: "Highest BidPrice",
          field: "price",
          sort: "asc",
        },
        {
          label: "Status",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>

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

export default AllProduct;
