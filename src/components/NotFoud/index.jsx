import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ message, linkRoute, linkText }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-8">
      <div className="text-2xl text-red-700">{message}</div>
      <Link
        className="p-1 px-3 mt-4 bg-red-500 rounded-2xl text-white"
        to={linkRoute}
      >
        {linkText}
      </Link>
    </div>
  );
};

NotFound.defaultProps = {
  message: "Nothing Found!",
  linkRoute: "/",
  linkText: "Go to Home Page",
};

export default NotFound;
