import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import ProductInfo from "./components/BidItems/ProductInfo";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductInfo />} />
        <Route path="/search/:keyword" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
