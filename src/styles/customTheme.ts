import { createTheme } from "@mui/material";

const getTheme = (mode: "dark" | "light") =>
  createTheme({
    palette: {
      mode,
    },
    breakpoints: {
      values: {
        xs: 400,
        sm: 650,
        md: 900,
        lg: 1024,
        xl: 1200,
      },
    },
    spacing: 8, // This sets the base spacing to 8px
  });

export default getTheme;
