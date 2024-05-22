import React, { createContext, useState, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/private/PrivateRoute";
import OrderPagePopUp from "./components/cart/OrderPagePopUp";
import EditUser from "./components/user/EditUser";

export interface ThemeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => undefined,
});

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Dashboard = lazy(() => import("./pages/DashBoard"));
const EditAProduct = lazy(() => import("./components/products/EditAProduct"));
const EditAddress = lazy(() => import("./components/address/EditAddress"));
const CreateProduct = lazy(() => import("./components/products/CreateProduct"));
const CreateAddress = lazy(() => import("./components/address/CreateAddress"));

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const initialThemeContext: ThemeContextType = {
    mode: mode,
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  return (
    <ThemeContext.Provider value={initialThemeContext}>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<PrivateRoute Component={Profile} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
          <Route
            path="/dashboard/edit/products/:id"
            element={<PrivateRoute Component={EditAProduct} />}
          />
          <Route
            path="/dashboard/create/product"
            element={<PrivateRoute Component={CreateProduct} />}
          />
          <Route
            path="/dashboard/:action/users/:id"
            element={<PrivateRoute Component={EditUser} />}
          />
          <Route
            path="/address/edit/:id"
            element={<PrivateRoute Component={EditAddress} />}
          />
          <Route
            path="/address/create"
            element={<PrivateRoute Component={CreateAddress} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/orderpopup" element={<OrderPagePopUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products/all" element={<ProductsPage />} />
          <Route
            path="/products/category/:catName/:id"
            element={<ProductsPage />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </ThemeContext.Provider>
  );
}

export default App;
