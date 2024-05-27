import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomFilledFeaturedButton } from "../../styles/styles";

const products = [
  {
    id: 1,
    name: "Lilac crop top",
    price: "$59.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/Crop-Top-White-Denim-Shorts-Outfit_lkjvjr.jpg",
  },
  {
    id: 2,
    name: "Yellow culottes",
    price: "$48.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/Linen-Shirt-Culottes-Outfit_qjdzvd.jpg",
  },
  {
    id: 3,
    name: "Magenta boots",
    price: "$69.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/MagentaBoot_kitrk0.webp",
  },
  {
    id: 4,
    name: "Blue Denim Jacket",
    price: "$29.99",
    image:
      "https://res.cloudinary.com/dpdhvztg3/image/upload/v1716767610/Denim_jacket_ixb4iq.webp",
  },
];

const FeaturedProducts = () => {
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
                src={product.image}
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
