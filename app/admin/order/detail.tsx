"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./column";
import { TableComponent } from "./table/dataTable";
import { fetchProducts } from "@/app/reduxs/product/products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/reduxs/store";

export const OrderDetail = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    product, // Use single product here for specific product view
    items, // Use items for all products
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("Single product:", product);
    console.log("All products:", items);
  }, []);

  // Handlers for Drawer and actions
  const handleUpdate = () => {
    setIsDrawerOpen(true); // Open drawer for update
  };

  const handleDelete = () => {
    alert("Deleted Successfully!");
    // Implement deletion logic here if necessary
  };

  const handleView = (value: any) => {
    return value?.id;
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
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
            data={items} // Use items to display all products
            onEdit={handleUpdate}
            onDelete={handleDelete}
            onView={handleView}
            onDismiss={handleClose}
            isOpen={isDrawerOpen}
            handleDrawerOpen={handleDrawerOpen}
          >
            <h3>This is it</h3>
          </TableComponent>
        ) : (
          <p>No Order available.</p>
        )}
      </div>
    </div>
  );
};
