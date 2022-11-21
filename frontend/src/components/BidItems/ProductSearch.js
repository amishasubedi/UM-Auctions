import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    //navigate(keyword.trim() ? `/search/${keyword}` : "/");
    keyword.trim() ? navigate(`/products/${keyword}`) : navigate("/");
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(event) => setKeyword(event.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductSearch;
