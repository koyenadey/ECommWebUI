import { useEffect } from "react";

import { Divider, ListItemText, Menu, MenuItem } from "@mui/material";

import { AppState, useAppDispatch } from "../../redux/store";
import fetchAllCategories from "../../redux/thunks/fetchAllCategories";
import { CATGET_URL } from "../../constants";
import { Category } from "../../misc/type";
import { useSelector } from "react-redux";
import { StyledLink } from "../../styles/styles";

interface CategoriesMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: (catName?: string, catId?: string) => void;
}

const CategoriesMenu = (props: CategoriesMenuProps) => {
  const { anchorEl, open, handleClose } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories(CATGET_URL));
  }, [dispatch]);

  const categories: Category[] = useSelector(
    (state: AppState) => state.productReducer.categories
  );

  return (
    <Menu
      sx={{ width: 320, maxWidth: "100%" }}
      id="category-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
      onClick={() => handleClose()}
    >
      <MenuItem>
        <StyledLink to="/products/all">All Products</StyledLink>
      </MenuItem>
      <Divider />
      {categories.map((category) => [
        <MenuItem onClick={() => handleClose(category?.name, category?.id)}>
          <ListItemText>{category.name}</ListItemText>
        </MenuItem>,
        <Divider />,
      ])}
    </Menu>
  );
};

export default CategoriesMenu;
