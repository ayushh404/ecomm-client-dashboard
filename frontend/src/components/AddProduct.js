import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    
    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:5000/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Add Product</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="text-red-500">Enter valid name</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Product Price
          </label>
          <input
            type="text"
            id="price"
            placeholder="Enter product price"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && <span className="text-red-500">Enter valid price</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Product Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="Enter product category"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && <span className="text-red-500">Enter valid category</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
            Product Company
          </label>
          <input
            type="text"
            id="company"
            placeholder="Enter product company"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && <span className="text-red-500">Enter valid company</span>}
        </div>

        <button
          onClick={addProduct}
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 w-full"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
