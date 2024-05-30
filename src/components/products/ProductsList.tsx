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
  ListItemText,
  IconButton,
  Card,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  CardActions,
} from "@mui/material";

import {
  StyledDeleteIcon,
  StyledDivider,
  StyledEditIcon,
  StyledListItem,
  StyledTableHeader,
} from "../../styles/styles";
import fetchProductCount from "../../redux/thunks/fetchProductCount";
import fetchProduct from "../../redux/thunks/fetchProduct";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAdd from "@mui/icons-material/PostAdd";

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

    if (confirm) {
      if (token) dispatch(deleteProduct({ baseUrl: url, token }));
    } else {
      setItemToDelete(null);
    }
    setDialogueOpen(false);
  };

  const pageChangeHandler = (value: number) => {
    setPageNo(value);
  };

  //const paginatedProducts = products.slice(offset, limit);
  const pageCount = Math.ceil(totalProds / pageSize);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ maxWidth: "850px", width: "80%", borderRadius: "10px" }}>
        <Box sx={{ overflowX: "auto", width: "100%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableHeader></StyledTableHeader>
                <StyledTableHeader>Product name</StyledTableHeader>
                <StyledTableHeader>Product category</StyledTableHeader>
                <StyledTableHeader>Product price</StyledTableHeader>
                <StyledTableHeader>Manage</StyledTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow hover key={product.id}>
                    <TableCell>
                      <Avatar
                        alt={product.name}
                        src={product.images[0].productImageUrl}
                        sx={{ width: "80px", height: "80px" }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => editProductHandler(product.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteProductHandler(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <CardActions sx={{ justifyContent: "space-between", marginY: "5px" }}>
          <Button
            variant="outlined"
            startIcon={<PostAdd />}
            onClick={() => navigate(`/dashboard/create/product`)}
          >
            Add new
          </Button>
          <Paging
            pageCount={pageCount}
            pageNo={pageNo}
            onPageChange={pageChangeHandler}
          />
        </CardActions>
        <CartDialogue isOpen={dialogueIsOpen} onClose={confirmDeleteHandler} />
      </Card>
    </Box>
  );
};

export default ProductsListForEdit;
