import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Signup");
  };
  return (
    <div className="bg-gray-800 py-4 flex items-center justify-between px-3">
      <Link to="/">
        <img
          src="https://yt3.googleusercontent.com/ytc/AIdro_kMDpr53L7RLMKSikyHT94VLzaimZ4U69xpGKYuGA=s900-c-k-c0x00ffffff-no-rj"
          alt="logo"
          className="w-[55px] h-[55px] rounded-full"
        />
      </Link>
      {auth ? (
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-white hover:text-gray-300">
              Add Product
            </Link>
          </li>
          {/* <li>
            <Link to="/update" className="text-white hover:text-gray-300">
              Update Product
            </Link>
          </li> */}
          <li>
            <Link to="/profile" className="text-white hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/Signup"
              onClick={logout}
              className="text-white hover:text-gray-300"
            >
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="text-right">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              SignUp
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
