import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomFilledFeaturedButton } from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { AppState, useAppDispatch } from "../../redux/store";
import fetchFeaturedProds from "../../redux/thunks/fetchFeaturedProds";
import { GETURL } from "../../constants";
import { useSelector } from "react-redux";

// const products = [
//   {
//     id: "1",
//     name: "Lilac crop top",
//     price: "$59.99",
//     image:
//       "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716768336/63a5055c-2557-4ffa-935b-fc898c41b8b3.jpg",
//   },
//   {
//     id: "2",
//     name: "Yellow culottes",
//     price: "$48.99",
//     image:
//       "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716768459/9075f767-4ec5-41fe-9a33-f7a7e6a43c01.jpg",
//   },
//   {
//     id: "3",
//     name: "Magenta boots",
//     price: "$69.99",
//     image:
//       "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/MagentaBoot_kitrk0.webp",
//   },
//   {
//     id: "4",
//     name: "Blue Denim Jacket",
//     price: "$29.99",
//     image:
//       "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/Denim_jacket_ixb4iq.webp",
//   },
// ];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeaturedProds(`${GETURL}/top/4`));
  }, []);

  const products = useSelector(
    (state: AppState) => state.productReducer.featuredProducts
  );

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Box sx={{ border: "1px solid #ccc", p: 2, textAlign: "center" }}>
              <img
                src={product.images[0].productImageUrl}
                alt={product.name}
                style={{ width: "100%" }}
              />
              <Typography variant="subtitle1" component="h3" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.price}
              </Typography>
              <CustomFilledFeaturedButton
                variant="contained"
                color="primary"
                aria-label={`Buy ${product.name}`}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                Buy Now
              </CustomFilledFeaturedButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts;
