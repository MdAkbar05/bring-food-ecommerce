import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // For notifications
import GoogleLogin from "../../components/LoginMethod/GoogleLogin";
import FacebookLogin from "../../components/LoginMethod/FacebookLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/userSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userReducer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dispatch the login action
    dispatch(loginUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        setIsSubmitting(false);
        toast.success("Login Successfull!");
        navigate("/"); // Change this to your login page route
      })
      .catch((e) => {
        setIsSubmitting(false);
        toast.error(e);
      });
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-center my-4">
            <span className="text-gray-600">Don't have an account?</span>
            <Link
              to="/signup" // Change this to your registration page route
              className="text-red-500 font-semibold hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
          <hr />
          <p className="flexCenter mt-2">
            <GoogleLogin />
          </p>
          <p className="flexCenter mt-2">
            <FacebookLogin />
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
