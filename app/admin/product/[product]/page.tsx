"use client";
import { usePathname } from "next/navigation"; // Import usePathname
import { fetchProductById } from "@/app/reduxs/product/products";
import { AppDispatch, RootState } from "@/app/reduxs/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname(); // Get the current URL path

  // Extract the product ID from the pathname
  const id = pathname?.split("/").pop(); // Assuming your URL structure is /products/[id]

  const { loading, error, product } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h4>This is the ID: {id}</h4>
      <h4>This is the ID: {product?.name}</h4>
    </div>
  );
};

export default SingleProduct;
