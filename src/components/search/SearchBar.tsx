import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";

import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { addSearchText } from "../../redux/slices/productSlice";
import { StyledMagnifyingGlass, StyledSearchBar } from "../../styles/styles";

const SearchBar = () => {
  const searchTextVal = useSelector(
    (state: AppState) => state.productReducer.searchText
  );
  const [searchText, setSearchText] = useState<string>(searchTextVal);

  const debounced = useDebouncedCallback((value) => {
    dispatch(addSearchText(value));
  }, 2000);
  const dispatch = useDispatch();

  useEffect(() => {
    debounced(searchText);
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
