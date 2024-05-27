import React from "react";
import { Slider, Typography } from "@mui/material";

interface PriceFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const ProductsPriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  setPriceRange,
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
    setPriceRange(newValue as number[]);
  };

  return (
    <>
      <Typography id="price-slider" gutterBottom>
        Filter by Price
      </Typography>
      <Slider
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="price-slider"
        min={0}
        max={1000}
      />
    </>
  );
};

export default ProductsPriceFilter;
