"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/app/context";

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  discount: string;
  images: File[];
}

const ProductForm = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the authenticated user from context

  const initialValues: ProductFormValues = {
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    discount: "",
    images: [],
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFieldValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("productImages")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("productImages").getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (values: ProductFormValues) => {
    if (!user) {
      console.error("User is not authenticated. Redirecting to login...");
      return; // Handle redirect or error
    }

    try {
      setLoading(true);
      const imageUrls = await uploadImages(values.images);

      // Insert product data into Supabase
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: values.name,
            description: values.description,
            price: values.price,
            oldPrice: values.oldPrice,
            discount: values.discount,
            images: imageUrls, // Save image URLs in the array
          },
        ])
        .select(); // Select the inserted row data if needed

      if (error) throw error;

      console.log("Product added successfully", data);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name">Product Name</label>
            <Field
              name="name"
              type="text"
              className="border p-2 w-full"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              as="textarea"
              className="border p-2 w-full"
              placeholder="Enter product description"
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field
              name="price"
              type="text"
              className="border p-2 w-full"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label htmlFor="oldPrice">Old Price</label>
            <Field
              name="oldPrice"
              type="text"
              className="border p-2 w-full"
              placeholder="Enter old price"
            />
          </div>

          <div>
            <label htmlFor="discount">Discount</label>
            <Field
              name="discount"
              type="text"
              className="border p-2 w-full"
              placeholder="Enter discount"
            />
          </div>

          <div>
            <label htmlFor="images">Upload Images</label>
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, setFieldValue)}
              className="border p-2 w-full"
            />

            <div className="flex space-x-2 mt-4">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-24 h-24 object-cover"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
