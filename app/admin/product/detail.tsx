"use client";

import React, { useEffect, useState } from "react";
import ProductForm from "./form";
import { columns } from "./column";
import { TableComponent } from "./table/dataTable";
import {
  deleteProduct,
  fetchProductById,
  fetchProducts,
} from "@/app/reduxs/product/products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/reduxs/store";

export const ProductDetail = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const {
    loading,
    error,
    items, // Use items for all products
    product,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleUpdate = (value: any) => {
    const productId = value?._id; // Retrieve the product ID from the selected value
    setSelectedProductId(productId);
    setIsDrawerOpen(true);

    if (selectedProductId) {
      dispatch(fetchProductById(selectedProductId))
        .unwrap()
        .then(() => {
          console.log("Product data fetched successfully");
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      console.error("No product ID available");
    }
  };

  const handleDelete = (value: any) => {
    dispatch(deleteProduct(value?._id));
  };

  const handleView = (value: any) => {
    return value?.id;
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setSelectedProductId(null);
    setIsDrawerOpen(true); // Open drawer for new product
  };

  // Dynamically create columns for the table
  const createColumns = columns({
    onEdit: handleUpdate,
    onDelete: handleDelete,
    onView: handleView,
  });

  return (
    <div>
      <div className="py-10">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : items && items.length > 0 ? (
          <TableComponent
            columns={createColumns}
            data={items}
            onEdit={handleUpdate}
            onDelete={handleDelete}
            onView={handleView}
            onDismiss={handleClose}
            isOpen={isDrawerOpen}
            handleDrawerOpen={handleDrawerOpen}
          >
            <ProductForm
              product={product}
              selectedProductId={selectedProductId}
            />
          </TableComponent>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};
