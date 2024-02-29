import { useEffect, useState } from "react";

import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { addSearchText } from "../../redux/slices/productSlices";
import { useDebouncedCallback } from "use-debounce";
import { StyledMagnifyingGlass, StyledSearchBar } from "../../styles/styles";

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
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
