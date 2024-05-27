import React from "react";
import { Box } from "@mui/material";
import ProductSearchBar from "./ProductSearchBar";
import ProductsPriceFilter from "./ProductPriceFilter";
import ProductsCategoriesFilter from "./ProductCategoriesFilter";
import { Category } from "../../misc/type";

interface FilterSidebarProps {
  searchTerm: string;
  handleSearch: (value: string) => void;
  categories: Category[];
  selectedCategory: string | undefined;
  setSelectedCategory: (value: string) => void;
}

const FilterSidebar = ({
  searchTerm,
  handleSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterSidebarProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <ProductSearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {/* <ProductsPriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      /> */}
      <ProductsCategoriesFilter
        categories={categories}
        selectedCategory={selectedCategory ?? ""}
        setSelectedCategory={setSelectedCategory}
      />
    </Box>
  );
};

export default FilterSidebar;
