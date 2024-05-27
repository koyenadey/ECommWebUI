import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Box from "@mui/material/Box";
import MasterPage from "../components/master-page/MasterPage";
import SimpleBreadcrumbs from "../components/navigation/SimpleBreadCrumbs";
import { transFormBreadCrumbs } from "../utils/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";
import { Product } from "../misc/type";
import { addToCart } from "../redux/slices/cartSlice";
import fetchProduct from "../redux/thunks/fetchProduct";
import { GETProdURL } from "../constants";
import {
  StyledDeliveryAccordian,
  StyledImageList,
  StyledProdDesc,
  StyledProdName,
  StyledProdPrice,
  StyledProdSpec,
  StyledProductCatParentBox,
  StyledProductChildBox,
  StyledProductDesc,
  StyledReturnsAccordian,
  StyledReviews,
} from "../styles/styles";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct(`${GETProdURL}/${id}`));
  }, [id]);

  const [qty, setQty] = useState<number>(1);
  const [tabValue, setTabValue] = useState<string>("productDetails");
  const [expanded, setExpanded] = useState<string>();
  const product: Product | undefined = useSelector(
    (state: AppState) => state.productReducer.productDetails
  );

  const addToCartHandler = () => {
    const productToAdd: Product = JSON.parse(JSON.stringify(product));
    productToAdd.inventory = qty;

    dispatch(addToCart(productToAdd));
    navigate("/checkout/cart");
  };

  //   const product: Product = {
  //     name: "Honeylane Half Zip Sweatshirt",
  //     description:
  //       "Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed.",
  //     price: "$150.00",
  //     images: [
  //       {
  //         url: "https://jupiterx.com/wp-content/uploads/2022/12/product-woman-jacket3-1.jpg",
  //       },
  //       {
  //         url: "https://jupiterx.com/wp-content/uploads/2022/12/product-woman-jacket3-2.jpg",
  //       },
  //       {
  //         url: "https://jupiterx.com/wp-content/uploads/2022/12/product-woman-jacket3-3.jpg",
  //       },
  //       {
  //         url: "https://jupiterx.com/wp-content/uploads/2022/12/product-woman-jacket3-4.jpg",
  //       },
  //     ],
  //     category: "Women",
  //     features: ["Free Shipping"],
  //   };

  const breadcrumbsValue = location.pathname;
  const breadcrumbs = transFormBreadCrumbs(breadcrumbsValue);

  return (
    <MasterPage>
      <Box>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <SimpleBreadcrumbs items={breadcrumbs} />
              <StyledImageList cols={2} rowHeight={400}>
                {product ? (
                  product.images.map((item) => (
                    <ImageListItem key={item?.imageUrl}>
                      <img
                        src={`${item.imageUrl}`}
                        alt={`${item.imageUrl}`}
                        loading="lazy"
                        style={{ height: "100%", width: "100%" }}
                      />
                    </ImageListItem>
                  ))
                ) : (
                  <></>
                )}
              </StyledImageList>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledProductCatParentBox>
                <StyledProductChildBox>
                  <Typography
                    component="h4"
                    sx={{ fontFamily: "Cambay, sans-serif" }}
                    display="block"
                    gutterBottom
                  >
                    {product?.category.name}
                  </Typography>
                  <StyledProdName component="h1" gutterBottom>
                    {product?.name}
                  </StyledProdName>
                  <StyledProdPrice component="h2" gutterBottom>
                    {product?.price}€ + Free Shipping
                  </StyledProdPrice>
                </StyledProductChildBox>
                <StyledProductDesc>
                  <Typography
                    sx={{ fontFamily: "Cambay, sans-serif", textAlign: "left" }}
                    component="div"
                    gutterBottom
                  >
                    {product?.description}
                  </Typography>
                  <Grid item sx={{ marginY: "15px" }}>
                    <TextField
                      id="quantity"
                      label="Quantity"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: 1,
                        "aria-label": "quantity",
                      }}
                      value={qty}
                      onChange={(event) => setQty(Number(event.target.value))}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      sx={{ backgroundColor: "#2172A1", marginY: "15px" }}
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      aria-label="Add to Cart"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </StyledProductDesc>
                <Grid
                  container
                  alignItems="center"
                  sx={{ marginTop: 2, textAlign: "left" }}
                >
                  <Grid item sx={{ marginBottom: "30px" }}>
                    <StyledReturnsAccordian
                      expanded={expanded === "cancelAndReturn"}
                      onChange={() =>
                        setExpanded(
                          expanded !== "cancelAndReturn"
                            ? "cancelAndReturn"
                            : undefined
                        )
                      }
                      disableGutters
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                        expandIcon={<AddIcon />}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Cambay, sans-serif",
                            fontWeight: "700",
                          }}
                        >
                          Returns and Cancellation policy
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider
                          sx={{ marginTop: "-10px", marginBottom: "15px" }}
                        />
                        <Typography sx={{ fontFamily: "Cambay, sans-serif" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspense malesuada lacus ex, sit amet blandit
                          leo lobortis eget. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit. Suspendisse malesuada
                          lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </StyledReturnsAccordian>
                    <StyledDeliveryAccordian
                      expanded={expanded === "deliveryAndShipping"}
                      onChange={() =>
                        setExpanded(
                          expanded !== "deliveryAndShipping"
                            ? "deliveryAndShipping"
                            : undefined
                        )
                      }
                      disableGutters
                      sx={{}}
                    >
                      <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                        expandIcon={<AddIcon />}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Cambay, sans-serif",
                            fontWeight: "700",
                          }}
                        >
                          Delivery and Shipping information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider
                          sx={{ marginTop: "-10px", marginBottom: "15px" }}
                        />
                        <Typography sx={{ fontFamily: "Cambay, sans-serif" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspense malesuada lacus ex, sit amet blandit
                          leo lobortis eget. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit. Suspendisse malesuada
                          lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </StyledDeliveryAccordian>
                  </Grid>
                </Grid>
              </StyledProductCatParentBox>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" marginTop="40px">
            <Tabs
              value={tabValue}
              onChange={(_event, newValue) => setTabValue(newValue)}
              aria-label="secondary tabs example"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab value="productDetails" label="Product Details" />
              <Tab
                value="additionalInformation"
                label="Additional Information"
              />
              {/* <Tab value="reviews" label="Reviews" /> */}
            </Tabs>
          </Grid>
          <Divider
            sx={{ marginY: 0, borderWidth: "1px", borderColor: "#9c27b0" }}
          />
          {tabValue === "productDetails" && (
            <Box sx={{ textAlign: "left" }}>
              <StyledProdDesc component="h2" sx={{}} gutterBottom>
                Product description
              </StyledProdDesc>
              <Typography component="div" sx={{ mb: "100px" }}>
                {product?.description}
              </Typography>
            </Box>
          )}
          {tabValue === "additionalInformation" && (
            <>
              <StyledProdSpec variant="h5" component="h2" gutterBottom>
                Product Specifications
              </StyledProdSpec>
              <Grid container spacing={2} sx={{ mb: "100px" }}>
                <Grid item xs={8} sx={{ textAlign: "middle" }}>
                  Weight:
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "left" }}>
                  {product?.weight} kg
                </Grid>
                <Grid item xs={8} sx={{ textAlign: "middle" }}>
                  Dimension:
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "left" }}>
                  20x45x32 (WxHxL) in cms
                </Grid>
                <Grid item xs={8} sx={{ textAlign: "middle" }}>
                  Item in stock:
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "left" }}>
                  {product?.inventory}
                </Grid>
              </Grid>
            </>
          )}
          {tabValue === "reviews" && (
            <div>
              <StyledReviews variant="h5" component="h2" gutterBottom>
                Reviews
              </StyledReviews>
              <Rating
                name="simple-controlled"
                value={2}
                onChange={() => undefined}
              />
              <TextField
                required
                id="review"
                label="Your review"
                multiline
                rows={4}
                margin="normal"
              />
              <TextField required id="name" label="Name" margin="normal" />
              <TextField required id="email" label="Email" margin="normal" />
              <Button variant="contained" color="primary" type="submit">
                SUBMIT
              </Button>
            </div>
          )}
        </Container>
      </Box>
    </MasterPage>
  );
};
export default ProductDetails;
