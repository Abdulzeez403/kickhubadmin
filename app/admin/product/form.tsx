"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { Button, UploadProps } from "antd";
import { createProduct, updateProduct } from "@/app/reduxs/product/products";
import { AppDispatch } from "@/app/reduxs/store";
import Image from "next/image";
import { Files } from "@/app/(components)/inputs/uploadFile";

const ProductForm = (product: any, selectedProductId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = useState([]);

  const item = product.product;

  const initialValues = {
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    category: item?.category || "",
    tag: item?.tag || "",
    stock: item?.stock || 0,
  };

  const handleProductImage: UploadProps["onChange"] = ({ fileList }: any) => {
    setFiles(fileList);
  };

  const handleSubmit = async (values: any) => {
    try {
      const productData = {
        ...values,
        images: files
          ?.map((f: any) => ({
            uri: f?.thumbUrl || f?.url,
            type: f?.type,
            name: f?.name,
          }))
          .filter((file) => file.uri),
      };

      if (selectedProductId) {
        await dispatch(
          updateProduct({ productId: selectedProductId, ...productData })
        );
        console.log("updating product");
      } else {
        await dispatch(createProduct(productData));
      }

      console.log("Product added or updated successfully");
    } catch (error) {
      console.error("Error adding or updating product:", error);
    }
  };

  return (
    <Formik
      key={selectedProductId}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
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
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field
              name="price"
              type="number"
              className="border p-2 w-full"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field
              name="category"
              type="text"
              className="border p-2 w-full"
              placeholder="Enter category"
              required
            />
          </div>
          <div>
            <label htmlFor="tag">Tag</label>
            <Field
              name="tag"
              type="text"
              className="border p-2 w-full"
              placeholder="Enter tag"
              required
            />
          </div>
          <div>
            <label htmlFor="stock">Stock</label>
            <Field
              name="stock"
              type="number"
              className="border p-2 w-full"
              placeholder="Enter stock"
              required
            />
          </div>

          <div className="my-4">
            <Files
              fileList={files} // Pass files as fileList
              handleChange={handleProductImage} // Corrected to use handleProductImage
            />
          </div>

          <div>
            {item?.images?.map((img: any, index: number) => (
              <div key={index}>
                <Image src={img.uri} width={100} height={40} alt="Product" />
              </div>
            ))}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Product
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
