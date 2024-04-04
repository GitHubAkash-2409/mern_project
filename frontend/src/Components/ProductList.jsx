import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (productId) => {
    let result = await fetch(`http://localhost:5000/product/${productId}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    console.log(event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-gray-800 mb-8">Products List</h1>
      <input
        type="text"
        placeholder="Search Product"
        class="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:shadow-outline w-64 mb-3"
        onChange={searchHandle}
      />
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-screen-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-semibold">
              <th className="py-3 px-6 text-left">S.No</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-left">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-700">{item.name}</td>
                  <td className="py-4 px-6 text-gray-700">{item.price}</td>
                  <td className="py-4 px-6 text-gray-700">{item.category}</td>
                  <td className="py-4 px-6 text-gray-700">{item.company}</td>
                  <td className="py-4 px-6 flex gap-4 items-center">
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md"
                    >
                      <MdDelete size={25} />
                    </button>
                    <Link to={"/update/" + item._id}>
                      <div className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md">
                        <MdOutlineSecurityUpdateGood size={25} />
                      </div>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <h1 className="text-2xl font-bold text-red-500 text-center">
                No Product Found
              </h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
