import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EDIT_PROFILE_RESET } from "../../redux/reducers/product_constants";
import { useNavigate } from "react-router";
import {
  editProfile,
  loadUsers,
  handleErrors,
} from "../../redux/actions/user_actions";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
    }

    if (error) {
      dispatch(handleErrors());
    }

    if (isUpdated) {
      dispatch(loadUsers());

      navigate("/myProfile");

      dispatch({
        type: EDIT_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (event) => {
    event.preventDefault();

    const NewData = new NewData();
    NewData.set("name", name);
    NewData.set("email", email);
    NewData.set("address", address);

    dispatch(editProfile(NewData));
  };

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            // onSubmit={submitHandler}
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mt-2 mb-5">Edit Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={nameChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={emailChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Address</label>
              <input
                type="address"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={addressChangeHandler}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
              //onClick={() => navigate("/myProfile")}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
