import { Navigate } from "react-router-dom";

interface PrivateRouteType {
  Component: React.ComponentType<any>;
}

const PrivateRoute = ({ Component }: PrivateRouteType) => {
  const isAuthenticated = localStorage.getItem("refresh-token") ? true : false;
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
