import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { addSearchText } from "../../redux/slices/productSlice";
import { StyledMagnifyingGlass, StyledSearchBar } from "../../styles/styles";
import fetchProducts from "../../redux/thunks/fetchProducts";
import fetchProductCount from "../../redux/thunks/fetchProductCount";
import { GETProdURL, GETURL, GET_COUNTURL } from "../../constants";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const searchTextVal = useSelector(
    (state: AppState) => state.productReducer.searchText
  );
  const [searchText, setSearchText] = useState<string>(searchTextVal);

  const debounced = useDebouncedCallback((value) => {
    const fetchProductUrl = `${GETURL}${value ? "?SearchKey=" + value : ""}`;
    const fetchProductCountUrl = `${GET_COUNTURL}${
      value ? "?SearchKey=" + value : ""
    }`;
    dispatch(fetchProducts(fetchProductUrl));
    dispatch(fetchProductCount(fetchProductCountUrl));
    // dispatch(addSearchText(value));
    // if (value) dispatch(fetchProducts(`${GETURL}?SearchKey=${value}`));
    // else dispatch(fetchProducts(GETURL));
  }, 2000);

  useEffect(() => {
    if (pathname.endsWith("all")) {
      debounced(searchText);
    }
  }, [dispatch, searchText, debounced]);

  return (
    <StyledSearchBar>
      <StyledMagnifyingGlass>
        <SearchIcon />
      </StyledMagnifyingGlass>
      <InputBase
        value={searchText}
        placeholder="search products"
        onChange={(event) => setSearchText(event.target.value)}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;
