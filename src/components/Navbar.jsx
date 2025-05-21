import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import { backendUrl } from '../App';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();
  const { setShowSearch, isLoggedIn, setIsLoggedIn } = useContext(ShopContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      Cookies.remove('token');
      setIsLoggedIn(false);
      setLogoutMessage('User logout successful');
      setTimeout(() => {
        setLogoutMessage('');
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="relative">
      {/* Logout success popup */}
      {logoutMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
          {logoutMessage}
        </div>
      )}

      <div className="flex items-center justify-between py-5 font-medium">
        <img src={assets.logo} className="w-36" alt="Logo" />

        {/* Menu Links */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          {['/', '/collection', '/about', '/contact'].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? '[&>hr]:block' : '[&>hr]:hidden'
                }`
              }
            >
              <p>{['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'][i]}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
            </NavLink>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />

          {/* Profile */}
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                }
              }}
            />
            {isLoggedIn && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-30">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
                  
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate('/orders')}
                  >
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            {/* <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              5
            </p> */}
          </Link>

          {/* Menu Icon for mobile */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
