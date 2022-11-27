import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import ProductInfo from "./components/BidItems/ProductInfo";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { loadUsers } from "./redux/actions/user_actions";
import EditProfile from "./components/User/EditProfile";
import store from "./redux/store/store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import UserProfile from "./components/User/UserProfile";
import PrivRoute from "./components/Auth/PrivRoute";
import { useSelector } from "react-redux";
import UpdatePassword from "./components/User/UpdatePassword";
import NewAuction from "./components/BidItems/NewAuction";
import MyBid from "./components/BidItems/MyBid";
import Admin from "./components/admin/Admin";
import AllUsers from "./components/User/AllUsers";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadUsers());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:keyword" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductInfo />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route
          exact
          path
          path="/myProfile"
          element={
            isAuthenticated ? <UserProfile /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/myProfile/update"
          element={
            isAuthenticated ? <EditProfile /> : <Navigate replace to="/login" />
          }
        />

        <Route exact path="/password/update" element={<UpdatePassword />} />
        <Route exact path="/new/auction" element={<NewAuction />} />
        <Route exact path="/orders/myOrder" element={<MyBid />} />
        <Route exact path="/dashboard" element={<Admin />} />
        <Route path="/admin/products" element={<Home />} />
        <Route path="/all/users" element={<AllUsers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
