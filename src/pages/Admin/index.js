import React from "react";
import { Outlet } from "react-router-dom";
import ProductManagement from "./Products";
import OrderManagement from "./Orders";
import UserManagement from "./Users";

const Admin = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <ProductManagement />
        <OrderManagement />
        <UserManagement />
      </div>
      <Outlet />
    </div>
  );
};

export default Admin;
