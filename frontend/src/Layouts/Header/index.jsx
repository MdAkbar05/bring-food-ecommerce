import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import Search from "../../components/Search/Search";

const Header = () => {
  const [clickUser, setClickUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null;

  const { totalCount } = useSelector((state) => state.cartReducer);

  const logout = () => {
    // Add logout logic here
  };

  return (
    <header className="sticky top-0 backdrop-blur-md py-2 bg-white z-50">
      <nav className="container flex justify-between items-center mx-auto">
        {/* Logo Section */}
        <Link to="/" className="flex items-center w-1/6">
          <img src={logo} className="w-auto h-10" alt="logo" />
          <span className="ml-2 text-lg font-semibold">Bring Food!</span>
        </Link>

        {/* Search Component (Visible on large screens) */}
        <div className="sm:hidden md:flex lg:flex-grow">
          <Search />
        </div>

        {/* Hamburger Menu Icon (Visible on small screens) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:flex items-center  lg:justify-center lg:ml-4 transition-all duration-300 ease-in-out lg:w-auto`}
        >
          <ul className="flex sm:flex-col sm:items-end lg:flex-row lg:gap-4 list-none lg:items-center">
            {user ? (
              <>
                <li
                  className="relative lg:flex lg:items-center"
                  onClick={() => setClickUser(!clickUser)}
                >
                  <Link to="/profile" className="nav-link">
                    {user.name}
                  </Link>
                  {clickUser && (
                    <div className="flex flex-col absolute bg-white border shadow-lg p-2 mt-2 right-0 z-50">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                      <Link className="nav-link" to="/orders">
                        Orders
                      </Link>
                      <button className="nav-link" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}

            <li>
              <Link to="/cart" className="nav-link relative">
                Cart
                {totalCount ? (
                  <span className="absolute -top-1 -right-4 rounded-full w-5 h-5 flex items-center justify-center bg-red-400 text-white text-xs">
                    {totalCount}
                  </span>
                ) : (
                  <span className="absolute -top-1 -right-4 rounded-full w-5 h-5 flex items-center justify-center bg-red-400 text-white text-xs">
                    0
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search for small devices (300px to 614px) */}
      <div className="lg:hidden mt-2 px-4">
        <Search />
      </div>
    </header>
  );
};

export default Header;
