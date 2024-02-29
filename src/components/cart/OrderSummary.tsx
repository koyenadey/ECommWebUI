import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Link,
  ListItemIcon,
} from "@mui/material";
import { EditButton } from "../../styles/styles";
import LockIcon from "@mui/icons-material/Lock";
import { AppState } from "../../redux/store";

const OrderSummary = () => {
  const navigate = useNavigate();
  const subTotal: number = useSelector(
    (state: AppState) => state.cartReducer.subTotal
  );

  return (
    <List
      sx={{
        width: "30%",
        bgcolor: "background.paper",
        //border: "1px solid black",
        margin: "2%",
      }}
    >
      <ListItem>
        <ListItemText>
          <Typography variant="h5">Order Summary</Typography>
        </ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText>
          <Typography variant="subtitle1" m={2}>
            Subtotal
          </Typography>
          <Link color="#383838" m={2}>
            Estimate Delivery
          </Link>
        </ListItemText>
        <ListItemText>
          <Typography variant="subtitle1">{subTotal}€</Typography>
        </ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText>
          <Typography variant="h5" ml={2}>
            Total
          </Typography>
        </ListItemText>
        <ListItemText>
          <Typography variant="h6" ml={10}>
            {subTotal}€
          </Typography>
        </ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <EditButton
          variant="contained"
          color="info"
          onClick={() => navigate("/checkout/cart")}
        >
          Checkout
        </EditButton>
      </ListItem>
      <ListItem sx={{ marginLeft: "10%" }}>
        <ListItemIcon sx={{ cursor: "pointer" }}>
          <LockIcon />
          <Typography component="span">Secure Checkout</Typography>
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

export default OrderSummary;
