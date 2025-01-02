import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get user data from LocalStorage
  const getUser = () => {
    const userJSON = localStorage.getItem("userInfo");
    return userJSON ? JSON.parse(userJSON) : null;
  };

  const user = getUser();

  // Redirect to login page after showing the message
  useEffect(() => {
    if (!user?.role == "admin") {
      // navigate to login with popup message
      navigate("/login", {
        state: {
          from: location,
          message: "You need to be an admin to access this page.",
        },
      });
    }
    // Unsubscribe from the effect when the component is unmounted
    return () => {};
  }, []);
  // Render the protected component if authenticated
  return children;
};

export default AuthRoute;
