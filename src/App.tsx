import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/private/PrivateRoute";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/categories/:productId/products"
          element={<ProductsPage />}
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout/cart" element={<Cart />} />
      </Routes>
    </Suspense>
  );
}

export default App;
