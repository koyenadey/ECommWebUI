import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Radio,
} from "@mui/material";
import { Category } from "../../misc/type";

interface CategoriesFilterProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const ProductsCategoriesFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesFilterProps) => {
  const handleChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  const newCategories = [
    {
      id: "",
      name: "All",
      image: "",
      creationAt: "",
      updatedAt: "",
    },
    ...categories,
  ];

  return (
    <Box sx={{ mt: "4rem" }}>
      <Typography gutterBottom>Filter by Categories</Typography>
      <FormGroup>
        {newCategories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Radio
                checked={category.id === selectedCategory}
                onChange={() => handleChange(category.id)}
                name={category.name}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default ProductsCategoriesFilter;
