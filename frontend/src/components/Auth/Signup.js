import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signupUser, handleErrors } from "../../redux/actions/user_actions";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: [event.target.value] });
  };

  // useeffect hook
  useEffect(() => {
    {
      isAuthenticated && navigate("/");
    }
    {
      error && dispatch(handleErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  const userRegisterHandler = (event) => {
    event.preventDefault();
    const userData = new userData();
    userData.set("name", name);
    userData.set("email", email);
    userData.set("password", password);

    dispatch(signupUser(userData));
  };
  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={userRegisterHandler}
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
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
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
