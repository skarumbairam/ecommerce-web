import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthendicated, user, children }) => {
  const location = useLocation();

  // User Not Authenticated & accessing other than login & register page redirect to Login

  if (
    !isAuthendicated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // User Authenticated & accessing login & register page redirect to Dashboard or Shop home page
  if (
    isAuthendicated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // User Authenticated & accessing admin routes, redirect to unautherized
  if (
    isAuthendicated &&
    location.pathname.includes("admin") &&
    user?.role !== "admin"
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthendicated &&
    location.pathname.includes("shop") &&
    user?.role === "admin"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
