import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Button,
  CardHeader,
  CardActions,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MasterPage from "../components/master-page/MasterPage";
import Avatar from "@mui/material/Avatar";
import {
  AddShoppingCart,
  Favorite,
  FavoriteOutlined,
  PreviewOutlined,
  Share,
  StoreOutlined,
} from "@mui/icons-material";
import { AppState, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Category, Product } from "../misc/type";
import { addToCart } from "../redux/slices/cartSlice";
import SimpleBreadcrumbs from "../components/navigation/SimpleBreadCrumbs";
import fetchWishlist from "../redux/thunks/fetchWishlist";
import { WISHLIST_GETURL } from "../constants";
import { useSelector } from "react-redux";
import deleteFromWishlist from "../redux/thunks/deleteFromWishlist";
import {
  CustomToastContainer,
  PageContainer,
  StyledWishlistButton,
  StyledWishlistCard,
  StyledWishlistCardContent,
} from "../styles/styles";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  dateAdded: string;
}

const Wishlist = () => {
  const token = localStorage.getItem("refresh-token") ?? "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWishlist({ baseUrl: WISHLIST_GETURL, token }));
  }, []);

  const wishlists = useSelector(
    (state: AppState) => state.wishlistReducer.wishlists
  );

  const wishlistId = wishlists[0]?.id;

  const handleRemoveFromWishlist = async (productId: string) => {
    console.log("Remove item with id: ", productId);

    if (wishlistId) {
      const result = await dispatch(
        deleteFromWishlist({
          baseUrl: `${WISHLIST_GETURL}/${wishlistId}/delete_product`,
          token,
          productId,
        })
      );
      if (result) navigate("/");
    }
  };

  const addToCartHandler = (product: Product) => {
    const productToAdd: Product = JSON.parse(JSON.stringify(product));
    productToAdd.inventory = 1;
    dispatch(addToCart(productToAdd));
    handleRemoveFromWishlist(product.id);
    //navigate("/checkout/cart");
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/products/all" },
    { label: "Wishlist", href: "#" },
  ];

  return (
    <MasterPage>
      <PageContainer>
        <SimpleBreadcrumbs items={breadcrumbItems} />
        <Typography
          variant="h4"
          marginY="50px"
          textAlign="center"
          fontWeight="700"
          color="#2272a1"
        >
          My Wishlist
        </Typography>

        <Grid container spacing={3}>
          {wishlists[0]?.wishlistItems?.map((item) => (
            <Grid item xs={4} key={item.id}>
              <StyledWishlistCard>
                <Box>
                  <CardMedia
                    component="img"
                    height="200px"
                    image={item.product.images[0].productImageUrl}
                    alt=""
                  />
                </Box>
                <StyledWishlistCardContent onClick={() => navigate(item.id)}>
                  <Typography fontWeight="600">{item.product.name}</Typography>
                  <Typography marginY="5px">
                    &euro; {item.product.price}
                  </Typography>
                </StyledWishlistCardContent>
                <CardActions disableSpacing sx={{ paddingTop: "0" }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Tooltip title="Remove product from wishlist">
                      <StyledWishlistButton
                        aria-label="remove product from wishlist"
                        onClick={() =>
                          handleRemoveFromWishlist(item.product.id)
                        }
                      >
                        <DeleteIcon />
                      </StyledWishlistButton>
                    </Tooltip>
                    <Tooltip title="add to cart">
                      <StyledWishlistButton
                        aria-label="addtocart"
                        onClick={() => addToCartHandler(item.product)}
                      >
                        <AddShoppingCart />
                      </StyledWishlistButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </StyledWishlistCard>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
      <CustomToastContainer />
    </MasterPage>
  );
};

export default Wishlist;
