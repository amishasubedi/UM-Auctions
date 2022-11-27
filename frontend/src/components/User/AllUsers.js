import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const { users } = useSelector((state) => state.allUsers);

  <Fragment>{users && users}</Fragment>;
};

export default AllUsers;
