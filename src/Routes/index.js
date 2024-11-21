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
const Index = () => {
  // set your conditional Route or Private Routes
  return (
    <BrowserRouter>
      {/* declare static Components here  Like Header Navbar etc */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<Home />} />
        <Route path="/tag/:tag" element={<Home />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* declare static Components here  Like Footer or Dropdown */}
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
