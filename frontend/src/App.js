import { Fragment } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <Home />
      <Footer />
    </Fragment>
  );
}

export default App;
