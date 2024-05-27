import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (value: string) => void;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  handleSearch,
}) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      fullWidth
      aria-label="Search products"
    />
  );
};

export default ProductSearchBar;
