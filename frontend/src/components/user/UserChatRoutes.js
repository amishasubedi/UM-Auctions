import { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserChat from "./UserChat";

const UserChatRoutes = () => {
  return (
    <Fragment>
      <UserChat />
      <Outlet />
    </Fragment>
  );
};

export default UserChatRoutes;
