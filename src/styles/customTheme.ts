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
  });

export default getTheme;
