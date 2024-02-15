import Navbar from "../components/navigation/NavBar";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";

import { Parallax } from "react-parallax";

import image1 from "../images/model1.jpg";
import item1 from "../images/image1.jpeg";
import model2 from "../images/model2.jpeg";
import model3 from "../images/model3.jpeg";

const viewPortStyle = { height: "100vh" };
const headingStyle = {
  ml: "35%",
  mt: "50%",
  color: "white",
  fontWeight: "600",
  fontSize: "100px",
};

const HomePage = () => {
  return (
    <Container>
      <Navbar />
      <Parallax strength={600} bgImage={image1}>
        <Typography sx={viewPortStyle}>This is a content</Typography>
      </Parallax>
      <Box>
        <Typography sx={{ m: "5%", p: "5%" }}>
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font.
        </Typography>
      </Box>
      <Box>
        <ImageList gap={70}>
          <ImageListItem>
            <img
              srcSet={`${item1}?w=150&h=164&fit=crop&auto=format&dpr=2 4x`}
              src={`${item1}?w=150&h=164&fit=crop&auto=format`}
              alt="Test"
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              srcSet={`${model2}?w=150&h=164&fit=crop&auto=format&dpr=2 4x`}
              src={`${model2}?w=150&h=164&fit=crop&auto=format`}
              alt="Test"
              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
      </Box>
      <Box>
        <Typography sx={{ m: "5%", p: "5%" }}>
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font.
        </Typography>
      </Box>
      <Parallax strength={600} bgImage={model3}>
        <Box sx={viewPortStyle}>
          <Typography sx={headingStyle}>50% OFF</Typography>
        </Box>
      </Parallax>
      <Box sx={viewPortStyle}>
        <Typography sx={{ m: "5%", p: "5%" }}>
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
