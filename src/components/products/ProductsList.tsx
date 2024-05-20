import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ProductsList } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store";
import fetchProducts from "../../redux/thunks/fetchProducts";
import Paging from "../pagination/Paging";
import { GETURL, GET_COUNTURL, PAGESIZE } from "../../constants";
import CartDialogue from "../cart/CartDialogue";
import deleteProduct from "../../redux/thunks/deleteProduct";

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  Divider,
  Button,
  Box,
} from "@mui/material";

import {
  StyledDeleteIcon,
  StyledDivider,
  StyledEditIcon,
  StyledListItem,
} from "../../styles/styles";
import fetchProductCount from "../../redux/thunks/fetchProductCount";

const ProductsListForEdit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pageNo, setPageNo] = useState<number>(1);
  const [dialogueIsOpen, setDialogueOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDelete] = useState<number | null>(null);

  const pageSize: number = PAGESIZE;
  const offset = (pageNo - 1) * pageSize;
  const limit = pageNo * pageSize;

  const isDeleted = useSelector(
    (state: AppState) => state.productReducer.isDeleted
  );

  useEffect(() => {
    dispatch(fetchProductCount(GET_COUNTURL));
    dispatch(fetchProducts(GETURL));
  }, [isDeleted, dispatch]);

  const products: ProductsList[] = useSelector(
    (state: AppState) => state.productReducer.products
  );

  const editProductHandler = (id: number) => {
    dispatch(fetchProducts(`${GETURL}/${id}`));
    navigate(`/dashboard/${"edit"}/products/${id}`);
  };

  const deleteProductHandler = (id: number) => {
    setItemToDelete(id);
    setDialogueOpen(true);
  };

  const confirmDeleteHandler = (confirm: boolean) => {
    const url = `${GETURL}/${itemToDeleteId}`;
    if (confirm) {
      dispatch(deleteProduct(url));
    } else {
      setItemToDelete(null);
    }
    setDialogueOpen(false);
  };

  const pageChangeHandler = (value: number) => {
    setPageNo(value);
  };

  const paginatedProducts = products.slice(offset, limit);
  const pageCount = Math.ceil(products.length / pageSize);

  return (
    <Box>
      <CartDialogue isOpen={dialogueIsOpen} onClose={confirmDeleteHandler} />
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
              <StyledListItem>{product.price}€</StyledListItem>
              <ListItemIcon onClick={() => editProductHandler(product.id)}>
                <StyledEditIcon />
              </ListItemIcon>
              <ListItemIcon onClick={() => deleteProductHandler(product.id)}>
                <StyledDeleteIcon />
              </ListItemIcon>
            </ListItem>
            <StyledDivider />
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
