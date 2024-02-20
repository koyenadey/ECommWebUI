import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout/cart" element={<Cart />} />
      </Routes>
    </Suspense>
  );
}

export default App;
