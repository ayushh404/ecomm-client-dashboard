import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const Navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    
    setTimeout(() => {
      Navigate('/signup');
    }, 500);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <Link to="/" className="text-2xl font-semibold">BuyCrow</Link>
        </div>
        {auth ? (
          <ul className="flex space-x-4">
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            <li><Link to="/update">Update Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <Link to="/logout" onClick={Logout}>
                Log Out ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li><Link to="/signup" className="text-white">Sign Up</Link></li>
            <li><Link to="/login" className="text-white">Login</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
