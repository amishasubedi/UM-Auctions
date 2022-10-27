import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  // to make product details id dynamic
  const { id } = useParams();
  console.log(id);
  return <h2>Product Detail Page</h2>;
};

export default ProductDetail;
