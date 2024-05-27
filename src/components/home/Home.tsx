import { Container, Box } from "@mui/material";
import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import FooterFeatures from "./FooterFeatures";

export const Home = () => {
  return (
    <Box>
      <Banner />
      <Container maxWidth="lg">
        <FeaturedProducts />
      </Container>
      <FooterFeatures />
    </Box>
  );
};

export default Home;
