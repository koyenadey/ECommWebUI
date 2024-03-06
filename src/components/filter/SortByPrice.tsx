import { useState } from "react";

import { Container, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSortType } from "../../redux/slices/productSlice";
import { StyledSelect, StyledInputLabel } from "../../styles/styles";

const SortByPrice = () => {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState<string>("asc");

  const sortProductHandler = (sortValue: string) => {
    setSortType(sortValue);
    dispatch(addSortType(sortValue));
  };

  return (
    <Container sx={{ marginTop: "10%" }}>
      <StyledInputLabel id="sortByPrice">Sort by Price</StyledInputLabel>
      <StyledSelect
        labelId="sortByPrice"
        label="Sort by Price"
        value={sortType}
        onChange={(event) => sortProductHandler(event.target.value as string)}
        color="secondary"
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </StyledSelect>
    </Container>
  );
};

export default SortByPrice;
