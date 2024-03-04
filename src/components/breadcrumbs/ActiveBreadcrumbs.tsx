import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { StyledBredCrumbs } from "../../styles/styles";

const breadcrumbNameMap: { [key: string]: string } = {
  "/categories": "Products",
};

const ActiveBreadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter((x) => x);
  const pathnames = path.slice(0, path.length - 1);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <StyledBredCrumbs aria-label="breadcrumb">
        <RouterLink color="inherit" to="/">
          Home
        </RouterLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const toNew = to === `/categories` ? `/products/all` : to;

          return last ? (
            <Typography color="textPrimary" key={to}>
              {value}
            </Typography>
          ) : (
            <RouterLink color="textPrimary" to={toNew} key={to}>
              {breadcrumbNameMap[to]}
            </RouterLink>
          );
        })}
        ;
      </StyledBredCrumbs>
    </Box>
  );
};

export default ActiveBreadcrumbs;
