import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";

import image1 from "../../images/model1.jpg";
import item1 from "../../images/image1.jpeg";
import model2 from "../../images/model2.jpeg";
import model3 from "../../images/model3.jpeg";

import { Parallax } from "react-parallax";
import { Heading } from "../../styles/styles";

const viewPortStyle = { height: "100vh" };

const Home = () => {
  return (
    <Container>
      <Parallax style={{ marginTop: "5%" }} strength={600} bgImage={image1}>
        <Heading sx={viewPortStyle}>Moda Morph</Heading>
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
              srcSet={`${item1}?w=150&h=164&fit=crop&auto=format&dpr=2 2x`}
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
          <Heading>50% OFF</Heading>
        </Box>
      </Parallax>
      <Box>
        <Typography sx={{ m: "5%", p: "5%" }}>
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
