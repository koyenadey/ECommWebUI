import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SimpleBreadcrumbs = ({ items }: BreadcrumbsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => (
        <Link key={index} href={item.href} sx={{}}>
          <Typography
            variant={isSmallScreen ? "overline" : "overline"}
            color="textPrimary"
          >
            {item.label}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default SimpleBreadcrumbs;
