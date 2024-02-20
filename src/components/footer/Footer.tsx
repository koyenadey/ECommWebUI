import { Parallax } from "react-parallax";

import {
  StyledFooter,
  StyledInformation,
  StyledItem,
} from "../../styles/styles";

import { Box } from "@mui/system";

//const viewPortStyle = { height: "50vh" };

const Footer = () => {
  const footerData: string[] = [
    "Contact Us",
    "FAQ",
    "Returns Policy",
    "Store Policy",
    "Payment Methods",
    "About Us",
  ];
  return (
    <Box>
      <Parallax strength={-600}>
        <StyledFooter>
          <StyledInformation>
            {footerData.map((footer) => (
              <StyledItem key={footer} variant="body1">
                {footer}
              </StyledItem>
            ))}
          </StyledInformation>
        </StyledFooter>
      </Parallax>
    </Box>
  );
};

export default Footer;
