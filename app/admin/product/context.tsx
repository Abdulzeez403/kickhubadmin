"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ProductCardProps } from "./modal";

interface ProductsContextType {
  products: ProductCardProps[] | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType>({
  products: null,
  loading: true,
  error: null,
  fetchProducts: () => {},
});

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductCardProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    console.log("working...");
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      setError(error.message);
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
