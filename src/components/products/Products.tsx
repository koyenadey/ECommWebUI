import { useState } from "react";

import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import Paging from "../pagination/Paging";
import * as Constants from "../../constants/index";
import { ProductsList } from "../../misc/type";
import Navbar from "../navigation/NavBar";

import { Container } from "@mui/system";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Products = () => {
  const [pageNo, setPageNo] = useState<number>(1);

  const navigate = useNavigate();
  const products = useSelector(
    (state: AppState) => state.productReducer.products
  );
  const isLoading = useSelector(
    (state: AppState) => state.productReducer.isLoading
  );
  const error = useSelector((state: AppState) => state.productReducer.error);

  const productDetailsHandler = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const pageChangeHandler = (value: number) => {
    setPageNo(value);
  };

  const pageSize = Constants.PAGESIZE;
  const offset = (pageNo - 1) * pageSize;
  const limit = pageNo * pageSize;

  const paginatedData: ProductsList[] = products.slice(offset, limit);

  if (isLoading) return <div>Loading...</div>;
  else if (error) {
    console.log(error);
    return <>{error}</>;
  }

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "10%" }}>
        <ImageList sx={{}} cols={2} gap={70}>
          {paginatedData.map((item) => (
            <ImageListItem key={item.id}>
              <img
                srcSet={`${item.category.image}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.category.image}?w=80&h=80&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.category.name}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`show details ${item.title}`}
                    onClick={() => productDetailsHandler(item.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Paging
          pageNo={pageNo}
          pageSize={pageSize}
          onPageChange={pageChangeHandler}
        />
      </Container>
    </>
  );
};

export default Products;
