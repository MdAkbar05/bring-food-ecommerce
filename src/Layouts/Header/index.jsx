import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogout from "../../components/LoginMethod/GoogleLogout";
import useAuth from "../../useAuth"; // Optional: to track the logged-in user
import {
  FaCartArrowDown,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

import logo from "../../assets/logo.png";
import Search from "../../components/Search/Search";
import { logoutUser } from "../../features/userSlice";
import { searchFoods } from "../../features/foodSlice";

const Header = () => {
  const [clickUser, setClickUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer.userInfo?.user);
  const googleUser = useAuth(); // Optional hook to get current user info
  const [user, setUser] = useState({
    username: "",
    email: "",
    photoURL: "",
    role: "user",
  });

  useEffect(() => {
    if (googleUser) {
      setUser({
        username: googleUser?.displayName,
        email: googleUser?.email,
        photoURL: googleUser?.photoURL,
        role: googleUser?.email.endsWith("@gmail.com") ? "admin" : "user",
      });
    } else {
      setUser({
        username: userInfo?.username,
        email: userInfo?.email,
        photoURL: "",
        role: userInfo?.role,
      });
    }
  }, [googleUser, userInfo, dispatch]);
  console.log(user);

  const { totalCount } = useSelector((state) => state.cartReducer);

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    if (query === "") {
      return;
    }
    // Dispatch the search action
    dispatch(searchFoods({ query }));

    // Navigate to the search results page (you can use a dedicated search results page)
    navigate(`/search?query=${query}`);
  };

  return (
    <header className="sticky top-0 backdrop-blur-md py-2 bg-white z-50">
      <nav className="container flex justify-between items-center mx-auto">
        {/* Logo Section */}
        <Link to="/" className="flex items-center w-1/6">
          <img src={logo} className="w-auto h-10" alt="logo" />
          <span className="ml-2 md:text-xl sm:text-base font-semibold">
            Bring Food!
          </span>
        </Link>

        {/* Search Component (Visible on large screens) */}
        <div className=" md:flex lg:flex-grow flexCenter">
          {/* Search bar  */}
          <div className="flexCenter gap-2 ">
            <input
              type="text"
              onChange={handleSearchChange}
              className={`sm:w-24 md:w-64 lg:w-96 border-2 border-section md:p-2 sm:p-2 rounded-3xl bg-section focus:outline-none focus:outline-primary ${
                isSearch ? `flex` : `hidden`
              }`}
              placeholder="Search..."
            />
            <FaSearch
              className="-ml-10 cursor-pointer text-primary"
              onClick={() => setIsSearch(!isSearch)}
              size={24}
              color="gray"
            />
          </div>
        </div>

        {/* Hamburger Menu Icon (Visible on small screens) */}
        <div className="lg:hidden sm:flex items-center">
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
            {user.username ? (
              <>
                <li className="relative lg:flex lg:items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.username?.slice(0, 1)}
                      className="size-6  rounded-full border border-gray-200"
                    />
                  ) : null}
                  <button
                    className="nav-link font-medium uppercase"
                    onClick={() => setClickUser(!clickUser)}
                  >
                    {user.username?.slice(0, 2)}
                  </button>

                  {clickUser && (
                    <div className="flex flex-col gap-2 absolute bg-white border shadow-lg p-2 mt-2 right-0 top-5 z-50">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>

                      {googleUser ? (
                        <GoogleLogout />
                      ) : (
                        <button
                          className="px-2 py-1 bg-red-500 rounded-md text-white"
                          onClick={() => dispatch(logoutUser())}
                        >
                          Logout
                        </button>
                      )}
                    </div>
                  )}
                </li>
                <li>
                  {user.role === "admin" ? (
                    <Link to="/admin" className="nav-link md:flex hidden">
                      Admin
                    </Link>
                  ) : null}
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
      {/* <div className="lg:hidden mt-2 px-4">
        <Search />
      </div> */}
    </header>
  );
};

export default Header;
