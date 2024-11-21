// src/GoogleLogin.js
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(user));
      window.location.href = "/";
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
          alt="Google Logo"
          className="w-6 h-6 mr-2"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
