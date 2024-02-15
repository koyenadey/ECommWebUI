import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetails from "./components/products/ProductDetails";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Suspense>
  );
}

export default App;
