import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./../pages/Home";
import Error from "./../pages/Errors";
import Header from "../Layouts/Header";
import FoodPage from "../pages/Food/FoodPage";
import CartPage from "../pages/Carts";
import Footer from "../Layouts/Footer";
import Profile from "../pages/Profile";
import LoginPage from "../pages/Login";
import SignUp from "../pages/Sign-up";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SearchPage from "../components/Search/Search";
import AuthRoute from "../components/AuthRoute/auth.route";
import Admin from "../pages/Admin";
import ScrollToTop from "../components/ScrollToTop";
import Checkout from "../pages/Checkout";
const Index = () => {
  // set your conditional Route or Private Routes
  return (
    <BrowserRouter>
      {/* declare static Components here  Like Header Navbar etc */}
      <Header />
      <ScrollToTop />
      <ToastContainer position="bottom-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/food/" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protecting Dashboard routes */}
        <Route
          path="/admin/*"
          element={
            <AuthRoute>
              <Admin />
            </AuthRoute>
          }
        >
          {/* Nested route */}
          <Route path="overview" element={<Admin />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      {/* declare static Components here  Like Footer or Dropdown */}
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
