import React from "react";
import { ProductDetail } from "./detail";
import { ProductsProvider } from "./context";

const ProductPage = () => {
  return (
    <div>
      <ProductsProvider>
        <ProductDetail />
      </ProductsProvider>
    </div>
  );
};

export default ProductPage;
