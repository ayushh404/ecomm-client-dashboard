import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data) {
        getProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    setSearchKey(key);
    if (key === '') {
      getProducts();
    } else {
      try {
        const result = await fetch(`http://localhost:5000/search/${key}`);
        const data = await result.json();
        setProducts(data);
      } catch (error) {
        console.error('Error searching for products:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-semibold text-center mb-4">Product List</h3>
      <input
        type="text"
        placeholder="Search Product"
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        onChange={searchHandle}
        value={searchKey}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left border-b border-gray-300">S. No.</th>
              <th className="px-6 py-3 text-left border-b border-gray-300">Name</th>
              <th className="px-6 py-3 text-left border-b border-gray-300">Price</th>
              <th className="px-6 py-3 text-left border-b border-gray-300">Category</th>
              <th className="px-6 py-3 text-left border-b border-gray-300">Operation</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 border-l border-r border-gray-300">{item.name}</td>
                  <td className="px-6 py-4 border-l border-r border-gray-300">{item.price}</td>
                  <td className="px-6 py-4 border-l border-r border-gray-300">{item.company}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${item._id}`}
                      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
