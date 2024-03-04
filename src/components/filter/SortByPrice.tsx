import { useState } from "react";

import { Container, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { addSortType } from "../../redux/slices/productSlices";

const SortByPrice = () => {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState<string>("asc");

  const sortProductHandler = (sortValue: string) => {
    setSortType(sortValue);
    dispatch(addSortType(sortValue));
  };

  return (
    <Container sx={{ marginTop: "10%" }}>
      <Select
        labelId="sortByPrice"
        label="Sort by Price"
        value={sortType}
        onChange={(event) => sortProductHandler(event.target.value)}
        color="secondary"
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </Container>
  );
};

export default SortByPrice;
