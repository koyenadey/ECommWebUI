import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Product } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store";
import fetchProducts from "../../redux/thunks/fetchProducts";
import Paging from "../pagination/Paging";
import { GETProdURL, GETURL, GET_COUNTURL, PAGESIZE } from "../../constants";
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
import fetchProduct from "../../redux/thunks/fetchProduct";

const ProductsListForEdit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pageNo, setPageNo] = useState<number>(1);
  const [dialogueIsOpen, setDialogueOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const pageSize: number = PAGESIZE;
  // const offset = (pageNo - 1) * pageSize;
  // const limit = pageNo * pageSize;

  const token = localStorage.getItem("refresh-token");

  const deletedId: string = useSelector(
    (state: AppState) => state.productReducer.deletedId
  );

  const totalProds: number = useSelector(
    (state: AppState) => state.productReducer.productCount
  );

  useEffect(() => {
    //dispatch(fetchProductCount(GET_COUNTURL));
    dispatch(fetchProducts(`${GETURL}?PageNo=${pageNo}&PageSize=${PAGESIZE}`));
  }, [pageNo]);

  const products: Product[] = useSelector(
    (state: AppState) => state.productReducer.products
  );

  const editProductHandler = async (id: string) => {
    try {
      const result = await dispatch(
        fetchProduct(`${GETProdURL}/${id}`)
      ).unwrap();
      if (result) navigate(`/dashboard/${"edit"}/products/${id}`);
    } catch (e) {
      setError("Error");
    }
  };

  const deleteProductHandler = (id: string) => {
    setItemToDelete(id);
    setDialogueOpen(true);
  };

  const confirmDeleteHandler = (confirm: boolean) => {
    const url = `${GETProdURL}/${itemToDeleteId}`;
    //console.log(url);
    if (confirm) {
      if (token) dispatch(deleteProduct({ baseUrl: url, token }));
    } else {
      setItemToDelete(null);
    }
    setDialogueOpen(false);
  };

  const pageChangeHandler = (value: number) => {
    console.log(value);
    setPageNo(value);
  };

  //const paginatedProducts = products.slice(offset, limit);
  const pageCount = Math.ceil(totalProds / pageSize);

  return (
    <Box>
      <CartDialogue isOpen={dialogueIsOpen} onClose={confirmDeleteHandler} />
      <Button
        sx={{ margin: "2%" }}
        variant="outlined"
        onClick={() => navigate(`/dashboard/create/product`)}
      >
        Add Product
      </Button>
      <Divider />
      <List>
        {products.map((product) => (
          <Box component="article" key={product.id} alignContent="center">
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt={product.name}
                  src={product.images[0].imageUrl}
                />
              </ListItemAvatar>
              <StyledListItem>{product.name}</StyledListItem>
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
