import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomFilledFeaturedButton } from "../../styles/styles";
import { products } from "../../data/data";
import { useNavigate } from "react-router-dom";

const featuredProducts = products;

const FeaturedProducts = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {featuredProducts.map((product) => (
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
