import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { allUsers, handleErrors } from "../../redux/actions/user_actions";

import { useNavigate } from "react-router";

import Sidebar from "./SideBar";

import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const AllUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      dispatch(handleErrors());
    }
  }, [dispatch, error, navigate]);

  const setUsers = () => {
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
          label: "Email",
          field: "Email",
          sort: "asc",
        },
        {
          label: "Password",
          field: "Password",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    user.forEach((userInfo) => {
      data.rows.push({
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        actions: (
          <Fragment>
            <Link
              to={`/admin/users/${userInfo._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              //onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  //   const deleteProductHandler = (id) => {
  //     dispatch(deleteProduct(id));
  //   };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default AllUser;
