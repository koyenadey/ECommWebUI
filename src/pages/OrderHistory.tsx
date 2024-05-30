import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { StyledCartHeader } from "../styles/styles";
import MasterPage from "../components/master-page/MasterPage";
import { useEffect } from "react";
import { AppState, useAppDispatch } from "../redux/store";
import fetchUser from "../redux/thunks/fetchUser";
import { LOGGEDIN_USERURL, ORDER_GETURL, USER_ADDRESSURL } from "../constants";
import fetchUserAddress from "../redux/thunks/fetchUserAddress";
import { setToken } from "../redux/slices/userSlice";
import fetchOrders from "../redux/thunks/fetchOrders";
import { useSelector } from "react-redux";
import { Order, ReadOrder } from "../misc/type";
import {
  calculateTotalSum,
  getFormattedDate,
  transformOrders,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refresh-token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (refreshToken) {
      dispatch(setToken(refreshToken));
      dispatch(fetchUser({ baseUrl: LOGGEDIN_USERURL, token: refreshToken }));
      dispatch(
        fetchUserAddress({ baseUrl: USER_ADDRESSURL, token: refreshToken })
      );
      dispatch(fetchOrders({ baseUrl: ORDER_GETURL, token: refreshToken }));
    }
  }, [dispatch, refreshToken]);

  const orders: Order[] = useSelector(
    (state: AppState) => state.orderReducer.orders
  );

  const loggedInUserRole = useSelector(
    (state: AppState) => state.userReducer.user?.role
  );

  const updatedOrders: ReadOrder[] = transformOrders(orders);

  return (
    <MasterPage>
      <Box sx={{ padding: 10 }}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <StyledCartHeader>Your Orders</StyledCartHeader>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(`/products/all`)}
            >
              Back to products
            </Button>
          </Box>
          {orders.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              we could not find any orders placed by you.
            </Typography>
          )}
        </Box>
        {orders &&
          updatedOrders.map((order) => (
            <Card
              key={`${order.id}-card`}
              sx={{ marginBottom: 2, border: "1px solid black" }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      ORDER ID
                    </Typography>
                    <Typography variant="body1">{order.id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="body2" color="textSecondary">
                      ORDER PLACED
                    </Typography>
                    <Typography variant="body1">
                      {getFormattedDate(order.orderDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="body2" color="textSecondary">
                      TOTAL
                    </Typography>
                    <Typography variant="body1">
                      {order.totalPrice.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="body2" color="textSecondary">
                      ORDERED BY
                    </Typography>
                    <Typography variant="body1">
                      {order.user.userName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="body2" color="textSecondary">
                      STATUS
                    </Typography>
                    <Typography variant="body1">{order.status}</Typography>
                  </Grid>
                  {loggedInUserRole === "Admin" && (
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/orders/edit/${order.id}`)}
                      >
                        Update Order
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <Divider sx={{ my: "2%" }} />
                {order.orderedProducts.map((item, index) => (
                  <Box
                    key={`${item.id}-${index}`}
                    sx={{ display: "flex", marginTop: 2 }}
                  >
                    <img
                      src={item.product.images[0].productImageUrl}
                      alt={item.product.name}
                      style={{ width: 100, height: 100, marginRight: 16 }}
                    />
                    <Box>
                      <Box></Box>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.priceAtPurchase}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.quantity}
                      </Typography>
                      <CardActions>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            navigate(`/products/${item.productId}`)
                          }
                        >
                          Buy it again
                        </Button>
                      </CardActions>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
      </Box>
    </MasterPage>
  );
};

export default OrderHistory;
