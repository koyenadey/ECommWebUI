import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  List,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  Divider,
  Button,
} from "@mui/material";

import { ProductsList } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store";

import { StyledListItem } from "../../styles/styles";
import EditIcon from "@mui/icons-material/Edit";
import Paging from "../pagination/Paging";
import { GETURL, PAGESIZE } from "../../constants";
import fetchProducts from "../../redux/thunks/fetchProducts";

const ProductsListForEdit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pageNo, setPageNo] = useState<number>(1);

  const pageSize: number = PAGESIZE;
  const offset = (pageNo - 1) * pageSize;
  const limit = pageNo * pageSize;

  const products: ProductsList[] = useSelector(
    (state: AppState) => state.productReducer.products
  );

  const editProductHandler = (id: number) => {
    dispatch(fetchProducts(`${GETURL}/${id}`));
    navigate(`/dashboard/${"edit"}/products/${id}`);
  };

  const pageChangeHandler = (value: number) => {
    setPageNo(value);
  };

  const paginatedProducts = products.slice(offset, limit);
  const pageCount = Math.ceil(products.length / pageSize);

  return (
    <Box>
      <Button
        sx={{ margin: "2%" }}
        variant="outlined"
        onClick={() => navigate(`/dashboard/${"create"}/products/`)}
      >
        Add Product
      </Button>
      <Divider />
      <List>
        {paginatedProducts.map((product) => (
          <Box component="article" key={product.id} alignContent="center">
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt={product.title}
                  src={product.category.image}
                />
              </ListItemAvatar>
              <StyledListItem>{product.title}</StyledListItem>
              <StyledListItem>{product.category.name}</StyledListItem>
              <StyledListItem>{product.price}</StyledListItem>
              <ListItemIcon onClick={() => editProductHandler(product.id)}>
                <EditIcon />
              </ListItemIcon>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
      <Paging
        pageCount={pageCount}
        pageNo={pageNo}
        onPageChange={pageChangeHandler}
      />
    </Box>
  );
};

export default ProductsListForEdit;
