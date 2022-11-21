import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import ProductInfo from "./components/BidItems/ProductInfo";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} exact />
        <Route path="/products/:keyword" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductInfo />} />
        <Route exact path="/login" element={<Login />} exact />
        <Route path="/register" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
