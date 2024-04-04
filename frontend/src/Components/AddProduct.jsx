import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addProduct = async () => {
    //Form Validations
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    ///////////////////
    // console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
        category: category,
        company: company,
        userId: userId,
      }),
    });
    result = await result.json();
    // console.log(JSON.stringify(result));
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {error && !name && (
        <span className="text-[red] mb-2">Enter valid name</span>
      )}
      <input
        type="text"
        placeholder="Enter Product Price"
        name="price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {error && !price && (
        <span className="text-[red] mb-2">Enter valid price</span>
      )}
      <input
        type="text"
        placeholder="Enter Product Category"
        name="category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {error && !category && (
        <span className="text-[red] mb-2">Enter valid category</span>
      )}
      <input
        type="text"
        placeholder="Enter Product Company"
        name="company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        className="w-64 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {error && !company && (
        <span className="text-[red] mb-2">Enter valid company</span>
      )}
      <button
        onClick={addProduct}
        className="w-64 px-4 py-2 mb-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
