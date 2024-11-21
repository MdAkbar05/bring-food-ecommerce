// src/GoogleLogout.js
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const GoogleLogout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-1 px-2.5 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default GoogleLogout;
