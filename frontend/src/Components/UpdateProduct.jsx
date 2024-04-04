import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, [params.id]); // Added params.id as a dependency

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleUpdateProduct = async () => {
    // Here you can make an API call or update the database with the form values
    console.log("Submitting:", name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    // Reset the form fields after submission
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");

    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Enter Product Price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Enter Product Category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Enter Product Company"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleUpdateProduct}
        className="w-64 px-4 py-2 mb-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
