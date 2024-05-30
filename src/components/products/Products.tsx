import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  styled,
  SelectProps,
  IconButton,
  Tooltip,
  Card,
} from "@mui/material";
import FilterSidebar from "./FilterSideBar";
import SimpleBreadcrumbs from "../navigation/SimpleBreadCrumbs";
import {
  CustomFormControl,
  CustomPagination,
  CustomSelect,
  CustomToastContainer,
  StyledIconButton,
  StyledProdCard,
  StyledProductCardContent,
  StyledProductsCard,
} from "../../styles/styles";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { transFormBreadCrumbs } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { Product } from "../../misc/type";
import {
  GETURL,
  PAGESIZE,
  GETCATPRD_COUNTURL,
  GET_COUNTURL,
  WISHLIST_GETURL,
} from "../../constants";
import fetchProducts from "../../redux/thunks/fetchProducts";
import {
  addSearchText,
  addSortType,
  addSortOrder,
} from "../../redux/slices/productSlice";
import { useDebouncedCallback } from "use-debounce";
import fetchProductCount from "../../redux/thunks/fetchProductCount";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import { addToCart } from "../../redux/slices/cartSlice";
import LoadingSpinner from "../master-page/LoadingSpinner";
import addToWishlist from "../../redux/thunks/addToWishlist";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast.success("Item added to wishlist");

const Products = () => {
  const token = localStorage.getItem("refresh-token") ?? "";
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageNo, setPageNo] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    id ?? undefined
  );
  const [sortType, setSortType] = useState<string>("byTitle");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const breadcrumbsValue = location.pathname;
  const breadcrumbs = transFormBreadCrumbs(breadcrumbsValue);

  const products: Product[] = useSelector(
    (state: AppState) => state.productReducer.products
  );

  const categories = useSelector(
    (state: AppState) => state.productReducer.categories
  );

  const isLoading = useSelector(
    (state: AppState) => state.productReducer.isLoading
  );

  const wishlists = useSelector(
    (state: AppState) => state.wishlistReducer.wishlists
  );
  const wishlistId = wishlists[0]?.id;

  const error = useSelector((state: AppState) => state.productReducer.error);

  const pgCount = Math.ceil(
    useSelector((state: AppState) => state.productReducer.productCount) /
      PAGESIZE
  );

  const pageChangeHandler = (page: number) => {
    setPageNo(page);
  };

  const sortChangeHandler = (sortChoice: string) => {
    setSortType(sortChoice.split("-")[0]);
    setSortOrder(sortChoice.split("-")[1]);
    dispatch(addSortType(sortChoice.split("-")[0]));
    dispatch(addSortOrder(sortChoice.split("-")[1]));
  };

  const addToCartHandler = (item: Product) => {
    const productToAdd: Product = JSON.parse(JSON.stringify(item));
    productToAdd.inventory = 1;

    dispatch(addToCart(productToAdd));
    navigate("/checkout/cart");
  };

  const wishlisItemAddHandler = async (productId: string) => {
    const baseUrl = `${WISHLIST_GETURL}/${wishlistId}/add_product`;
    if (wishlistId) {
      const results = await dispatch(
        addToWishlist({ baseUrl, token, productId })
      );
      if (results) {
        //navigate("/wishlist");
        notify();
      }
    }
  };

  const searchTextVal = useSelector(
    (state: AppState) => state.productReducer.searchText
  );

  const debouncedSearch = useDebouncedCallback((value) => {
    dispatch(addSearchText(value));
  }, 2000);

  const prodCountUrl: string = selectedCategory
    ? `${GETCATPRD_COUNTURL}/${selectedCategory}/meta`
    : GET_COUNTURL;
  const productUrl = selectedCategory
    ? `${GETURL}/category/${selectedCategory}`
    : GETURL;

  useEffect(() => {
    setSelectedCategory(id);
  }, [id]);

  useEffect(() => {
    dispatch(
      fetchProducts(
        `${productUrl}?PageNo=${pageNo}&PageSize=${PAGESIZE}${
          searchTextVal.length > 0 ? "&SearchKey=" + searchTextVal : ""
        }&sortType=${sortType}&sortOrder=${sortOrder}`
      )
    );
    dispatch(
      fetchProductCount(
        `${prodCountUrl}${
          searchTextVal.length > 0 ? "?SearchKey=" + searchTextVal : ""
        }`
      )
    );
  }, [pageNo, searchTextVal, sortType, sortOrder, selectedCategory]);

  if (isLoading) return <LoadingSpinner />;
  else if (error) {
    return <>{error}</>;
  }

  const handleSearch = (newValue: string) => {
    debouncedSearch(newValue);
    setSearchTerm(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterSidebar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <SimpleBreadcrumbs items={breadcrumbs} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 6,
              }}
            >
              <Typography variant="body2">
                Showing {products.length} results
              </Typography>
              <CustomFormControl>
                <InputLabel id="sortChoices">Sorting choices</InputLabel>
                <CustomSelect
                  labelId="sortChoices"
                  label="Select sort choice"
                  value={`${sortType}-${sortOrder}`}
                  onChange={(e) => sortChangeHandler(e.target.value as string)}
                >
                  <MenuItem value="byPrice-asc">
                    Sort by price: low to high
                  </MenuItem>
                  <MenuItem value="byPrice-desc">
                    Sort by price: high to low
                  </MenuItem>
                  <MenuItem value="byTitle-asc">
                    Sort by product title: A-Z
                  </MenuItem>
                  <MenuItem value="byTitle-desc">
                    Sort by product title: Z-A
                  </MenuItem>
                </CustomSelect>
              </CustomFormControl>
            </Box>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <StyledProductsCard>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.images[0].productImageUrl}
                      alt={product.name}
                    />
                    <StyledProductCardContent
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <Typography
                        fontWeight="700"
                        color="#2272a1"
                        height="50px"
                        overflow="hidden"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.category.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight="700"
                        fontSize="15px"
                      >
                        ${product.price}
                      </Typography>
                    </StyledProductCardContent>
                    <CardActions sx={{ marginTop: "0" }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Tooltip title="Add product to cart">
                          <StyledIconButton
                            onClick={() => addToCartHandler(product)}
                          >
                            <AddShoppingCart />
                          </StyledIconButton>
                        </Tooltip>
                        <Tooltip title="Add product to wishlist">
                          <StyledIconButton
                            onClick={() => wishlisItemAddHandler(product.id)}
                          >
                            <Favorite />
                            <CustomToastContainer />
                          </StyledIconButton>
                        </Tooltip>
                      </Box>
                    </CardActions>
                  </StyledProductsCard>
                </Grid>
              ))}
            </Grid>
            <CustomPagination>
              <Pagination
                count={pgCount}
                page={pageNo}
                color="primary"
                onChange={(event, page) => pageChangeHandler(page)}
              />
            </CustomPagination>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;
