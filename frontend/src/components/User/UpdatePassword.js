import React, { Fragment, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  handleErrors,
  loadUsers,
  updatePassword,
} from "../../redux/actions/user_actions";
import { UPDATE_PASSWORD_RESET } from "../../redux/reducers/product_constants";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      dispatch(handleErrors());
    }

    console.log(isUpdated);
    if (isUpdated) {
      // dispatch(loadUsers());
      alert("Password Updated Successfully");
      navigate("/myProfile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [navigate, error, isUpdated, dispatch]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label for="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
