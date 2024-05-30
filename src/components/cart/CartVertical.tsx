import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpandMore } from "@mui/icons-material";
import {
  StyledCartContainer,
  StyledCartItem,
  StyledCartItemQuamtityGrid,
  StyledCheckOut,
  StyledContainer,
  StyledImage,
  StyledLock,
} from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  resetCart,
  updateCart,
} from "../../redux/slices/cartSlice";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  AddressType,
  CreateOrdersType,
  OrderedProductsType,
  Product,
} from "../../misc/type";
import createOrder from "../../redux/thunks/createOrder";
import { ORDER_GETURL } from "../../constants";
import CartDialogue from "./CartDialogue";
import SuccessModal from "../products/SuccessModal";
import AddressList from "../address/AddressList";
import AddressCard from "../address/AddressCard";
import { setOrderAddresId } from "../../redux/slices/orderSlice";

const CartVertical = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSuccess, setIsSuceess] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const [dialogueIsOpen, setDialogueIsOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDelete] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setIsSuccessModalOpen(false);
    dispatch(resetCart());
    navigate("/order-history");
  };

  const subTotal: number = useSelector(
    (state: AppState) => state.cartReducer.subTotal
  );

  const token: string = localStorage.getItem("refresh-token") ?? "";

  const userId: string =
    useSelector((state: AppState) => state.userReducer.user?.id) ?? "";
  const addressId: string = useSelector(
    (state: AppState) => state.orderReducer.orderAddresId
  );
  const cartItems: Product[] = useSelector(
    (state: AppState) => state.cartReducer.cart
  );
  const addressSelected = useSelector(
    (state: AppState) => state.orderReducer.orderAddresId
  );

  const addresses: AddressType[] = useSelector(
    (state: AppState) => state.userReducer.addresses
  );

  const { isLoggedIn } = useSelector((state: AppState) => state.userReducer);

  const orderedProducts: OrderedProductsType[] = cartItems.map((product) => ({
    productId: product?.id,
    quantity: product?.inventory,
    priceAtPurchase: product?.price,
  }));

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const order: CreateOrdersType = {
      userId,
      addressId,
      orderedProducts,
    };

    var result = await dispatch(
      createOrder({ baseUrl: `${ORDER_GETURL}`, order, token })
    );
    if (result) {
      setIsSuceess(true);
    }
  };

  const confirmDeleteHandler = (confirm: boolean) => {
    if (confirm) {
      dispatch(removeFromCart(itemToDeleteId as string));
    } else {
      setItemToDelete(null);
    }
    setDialogueIsOpen(false);
  };

  const removeItemHandler = (itemId: string) => {
    setItemToDelete(itemId);
    setDialogueIsOpen(true);
  };

  const updateCartHandler = (item: Product, qty: string) => {
    const quantity = Number(qty);
    dispatch(updateCart({ productId: item.id, quantity: quantity }));
  };

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddress(addressId);
    dispatch(setOrderAddresId(addressId));
  };

  return (
    <StyledCartContainer>
      <CartDialogue isOpen={dialogueIsOpen} onClose={confirmDeleteHandler} />
      {isLoggedIn && (
        <Typography
          variant="h4"
          marginY="30px"
          fontWeight="700"
          color="#2272a1"
        >
          Review your Cart
        </Typography>
      )}
      {!isLoggedIn && (
        <Typography variant="h5" marginY="30px" fontWeight="600">
          Login to continue to place an order
        </Typography>
      )}
      <Box width="80%" maxWidth="1000px">
        <Accordion
          defaultExpanded={true}
          disableGutters
          sx={{ marginBottom: "20px" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ borderRadius: "8px" }}
          >
            <Typography fontWeight="700" variant="h6">
              Cart
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ marginBottom: "30px" }}>
            <Grid container spacing={1}>
              {cartItems.map((item, index) => (
                <Box width="100%" key={index}>
                  <StyledCartItem container>
                    <Grid
                      item
                      xs={12}
                      sm={5}
                      md={2}
                      overflow="wrap"
                      textAlign="center"
                    >
                      <StyledImage
                        src={item.images?.[0].productImageUrl}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7} md={4} overflow="wrap">
                      <Typography>{item.name}</Typography>
                    </Grid>
                    <StyledCartItemQuamtityGrid item xs={12} sm={4} md={1}>
                      <TextField
                        type="number"
                        value={item.inventory}
                        inputProps={{ min: 1 }}
                        size="small"
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                        sx={{ maxWidth: "70px" }}
                      />
                    </StyledCartItemQuamtityGrid>
                    <Grid item xs={6} sm={6} md={2} textAlign="center">
                      <Typography>
                        ${(item.price * item.inventory).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} md={1}>
                      <IconButton onClick={() => removeItemHandler(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </StyledCartItem>
                  <Divider />
                </Box>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion disableGutters sx={{ marginBottom: "20px" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography fontWeight="700" variant="h6">
                Shipping address
              </Typography>
              {!selectedAddress && (
                <Typography fontWeight="500" color="red" fontSize="14px">
                  *No address selected
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {addresses.map((address, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <AddressCard
                    isChecked={address.id === selectedAddress}
                    handleRadioChange={handleAddressSelection}
                    address={address}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion disableGutters sx={{ marginBottom: "20px" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography fontWeight="700" variant="h6">
                Sub totals & Confirm
              </Typography>
              <Typography fontWeight="600" color="primary" fontSize="16px">
                &euro; {subTotal.toFixed(2)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container paddingX="20px">
              <Grid item xs={6}>
                <Typography variant="h6" marginBottom="10px">
                  Cart Totals
                </Typography>
                <Typography fontWeight="700">
                  Subtotal: &euro; {subTotal.toFixed(2)}
                </Typography>
                <Typography color="#8e8e8e" marginY="10px">
                  Enjoy free shipping exclusively
                </Typography>
                <Typography fontWeight="700">
                  Total &euro; {subTotal.toFixed(2)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                justifyContent="flex-end"
                alignItems="end"
              >
                <Box width="100%" textAlign="right">
                  <StyledLock />
                  <Typography component="span">Secure Checkout</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={!selectedAddress}
                  onClick={handleSubmit}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
      <SuccessModal open={isSuccessModalOpen} onClose={handleClose} />
    </StyledCartContainer>
  );
};

export default CartVertical;
