import { useState } from "react";

import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import Paging from "../pagination/Paging";
import * as Constants from "../../constants/index";
import { ProductsList } from "../../misc/type";
import { ProductItemIcon } from "../../styles/styles";

import { Container } from "@mui/system";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useFetchUser from "../../hook/useFetchUser";
import SortByPrice from "../filter/SortByPrice";

const Products = () => {
  useFetchUser();

  const [pageNo, setPageNo] = useState<number>(1);

  const navigate = useNavigate();

  const products = useSelector(
    (state: AppState) => state.productReducer.products
  );

  const sortTypeValue = useSelector(
    (state: AppState) => state.productReducer.sortType
  );

  const searchValue = useSelector(
    (state: AppState) => state.productReducer.searchText
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

  const pageSize: number = Constants.PAGESIZE;
  const offset = (pageNo - 1) * pageSize;
  const limit = pageNo * pageSize;

  const productsDataCopy: ProductsList[] = [...products];

  const sortedData =
    sortTypeValue === "asc"
      ? productsDataCopy.sort(
          (firstProd, secondProd) => firstProd.price - secondProd.price
        )
      : productsDataCopy.sort(
          (firstProd, secondProd) => secondProd.price - firstProd.price
        );

  const searchedData = sortedData.filter((p) => {
    return Object.values(p).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const paginatedData: ProductsList[] = searchedData.slice(offset, limit);

  const pageCount = Math.ceil(searchedData.length / pageSize);

  if (isLoading) return <div>Loading...</div>;
  else if (error) {
    console.log(error);
    return <>{error}</>;
  }

  return (
    <>
      <Container sx={{ marginTop: "10%" }}>
        <SortByPrice />
        <ImageList cols={2} gap={70}>
          {paginatedData.map((item) => (
            <ImageListItem key={item.id}>
              <img
                srcSet={`${item.category.image}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.category.image}?w=80&h=80&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item?.title}
                subtitle={`${item?.price} €`}
                actionIcon={
                  <>
                    <ProductItemIcon
                      aria-label={`show details ${item.title}`}
                      onClick={() => productDetailsHandler(item?.id)}
                    >
                      <VisibilityIcon />
                    </ProductItemIcon>
                  </>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Paging
          pageNo={pageNo}
          pageCount={pageCount}
          onPageChange={pageChangeHandler}
        />
      </Container>
    </>
  );
};

export default Products;
