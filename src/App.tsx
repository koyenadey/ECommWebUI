import React, { createContext, useState, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/private/PrivateRoute";
import OrderPagePopUp from "./components/cart/OrderPagePopUp";
import EditUser from "./components/user/EditUser";
import OrderHistory from "./pages/OrderHistory";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { AppState } from "./redux/store";
import LoadingSpinner from "./components/master-page/LoadingSpinner";
import UserData from "./components/profile/UserData";
import RegisterUser from "./pages/RegisterUser";

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
const EditOrder = lazy(() => import("./components/cart/EditOrder"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

function App() {
  const themeMode = useSelector(
    (state: AppState) => state.userReducer.themeMode
  );

  const darkTheme = createTheme({
    palette: {
      mode: themeMode,
    },
    typography: {
      fontFamily: "Nunito, Montserrat, sans-serif",
      allVariants: {
        fontFamily: "Nunito, Montserrat, sans-serif",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Suspense fallback={<LoadingSpinner />}>
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
            path="/wishlist"
            element={<PrivateRoute Component={Wishlist} />}
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
          <Route
            path="/orders/edit/:id"
            element={<PrivateRoute Component={EditOrder} />}
          />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/orderpopup" element={<OrderPagePopUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products/all" element={<ProductsPage />} />
          <Route
            path="/products/category/:catName/:id"
            element={<ProductsPage />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/checkout/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
