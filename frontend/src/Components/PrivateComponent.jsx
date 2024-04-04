import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/signup" />
  );
};

export default PrivateComponent;
