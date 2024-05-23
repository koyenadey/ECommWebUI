import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";

import Paging from "../pagination/Paging";
import * as Constants from "../../constants/index";
import { Product, ProductsList } from "../../misc/type";
import { ProductItemIcon } from "../../styles/styles";

import { Container } from "@mui/system";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useFetchUser from "../../hook/useFetchUser";
import SortByPrice from "../filter/SortByPrice";
import fetchProducts from "../../redux/thunks/fetchProducts";
import { GETURL, PAGESIZE } from "../../constants/index";

const Products = () => {
  //const { id } = useParams();
  useFetchUser();
  const dispatch = useAppDispatch();
  const [pageNo, setPageNo] = useState<number>(1);

  const searchTextVal = useSelector(
    (state: AppState) => state.productReducer.searchText
  );

  useEffect(() => {
    dispatch(
      fetchProducts(
        `${GETURL}?PageNo=${pageNo}&PageSize=${PAGESIZE}${
          searchTextVal.length > 0 ? "&SearchKey=" + searchTextVal : ""
        }`
      )
    );
  }, [pageNo]);

  const navigate = useNavigate();

  const products = useSelector(
    (state: AppState) => state.productReducer.products
  );

  const totalProducts = useSelector(
    (state: AppState) => state.productReducer.productCount
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

  const productDetailsHandler = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const pageChangeHandler = (value: number) => {
    setPageNo(value);
  };

  const pageSize: number = PAGESIZE;
  const offset = (pageNo - 1) * pageSize;
  const limit = pageNo * pageSize;

  const productsDataCopy: Product[] = [...products];

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

  const paginatedData: Product[] = searchedData; //.slice(offset, limit);

  const pageCount = Math.ceil(totalProducts / pageSize);

  if (isLoading) return <div>Loading...</div>;
  else if (error) {
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
                srcSet={`${item.images[0].imageUrl}?w=80&h=80&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.images[0].imageUrl}?w=80&h=80&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={item?.name}
                subtitle={`${item?.price} €`}
                actionIcon={
                  <>
                    <ProductItemIcon
                      aria-label={`show details ${item.name}`}
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
