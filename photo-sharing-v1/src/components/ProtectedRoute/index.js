import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ currentUser, children }) {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(currentUser);
  if (!currentUser || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
