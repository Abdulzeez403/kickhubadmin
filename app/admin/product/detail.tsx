"use client";

import React, { useEffect, useState } from "react";
import ProductForm from "./form";
import { columns } from "./column";
import { ProductCardProps } from "./modal";
import { TableComponent } from "./table/dataTable";
import { supabase } from "@/lib/supabaseClient";

export const ProductDetail = () => {
  const [products, setProducts] = useState<ProductCardProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        setProducts(data as ProductCardProps[]);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handlers for Drawer and actions
  const handleUpdate = (value: ProductCardProps) => {
    setIsDrawerOpen(true); // open drawer for update
  };

  const handleDelete = (value: ProductCardProps) => {
    alert("Deleted Successfully!");
    // Implement deletion logic here if necessary
  };

  const handleView = (value: ProductCardProps) => {
    return value?.id;
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); // open drawer for new product
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
        ) : products && products.length > 0 ? (
          <TableComponent
            columns={createColumns}
            data={products}
            onEdit={handleUpdate}
            onDelete={handleDelete}
            onView={handleView}
            onDismiss={handleClose}
            isOpen={isDrawerOpen}
            handleDrawerOpen={handleDrawerOpen}
          >
            <ProductForm />
          </TableComponent>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};
