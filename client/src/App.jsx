import { useState } from "react";
import { resolvePath, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";

import AdminLayout from "./components/admin/Layout";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminOrderPage from "./pages/admin/Order";
import AdminProductsPage from "./pages/admin/Products";

import ShoppingLayout from "./components/shopping/Layout";
import ShoppingHomePage from "./pages/shopping/Home";
import ShoppingListingPage from "./pages/shopping/Listing";
import ShoppingAccountPage from "./pages/shopping/Account";
import ShoppingCheckoutPage from "./pages/shopping/Checkout";

import PageNotFound from "./pages/page-not-found";
import UnauthPage from "./pages/unauth";
import CheckAuth from "./components/common/CheckAuth";

function App() {
  const isAuthendicated = true;
  const user = {
    role: "user",
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Common Component Like Header*/}

      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthendicated={isAuthendicated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthendicated={isAuthendicated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="order" element={<AdminOrderPage />} />
          <Route path="products" element={<AdminProductsPage />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthendicated={isAuthendicated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHomePage />} />
          <Route path="listing" element={<ShoppingListingPage />} />
          <Route path="account" element={<ShoppingAccountPage />} />
          <Route path="checkout" element={<ShoppingCheckoutPage />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
