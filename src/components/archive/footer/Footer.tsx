import { Parallax } from "react-parallax";
import { useNavigate } from "react-router-dom";

import {
  StyledBtnFooter,
  StyledCopyrightIcon,
  StyledCopyrightText,
  StyledFacebookIcon,
  StyledFooter,
  StyledInformation,
  StyledInstagramIcon,
  StyledYoutubeIcon,
  SubscribeBox,
  SubscribeBtn,
  SubscribeText,
} from "../../../styles/styles";

import { Box } from "@mui/system";
import { footerData } from "../../../data/data";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Parallax strength={-600}>
        <StyledFooter>
          <StyledInformation>
            {footerData.map((footer) => (
              <StyledBtnFooter
                key={footer.name}
                onClick={() =>
                  navigate(`/${footer.goTo}`, { state: footer.component })
                }
              >
                {footer.name}
              </StyledBtnFooter>
            ))}
          </StyledInformation>
          <SubscribeBox>
            <SubscribeText
              placeholder="Enter your email here"
              variant="outlined"
            />
            <SubscribeBtn variant="contained">Subscribe</SubscribeBtn>
          </SubscribeBox>
          <SubscribeBox>
            <StyledInstagramIcon />
            <StyledFacebookIcon />
            <StyledYoutubeIcon />
          </SubscribeBox>
          <SubscribeBox>
            <StyledCopyrightIcon />
            <StyledCopyrightText>2024 by ModaMorph</StyledCopyrightText>
          </SubscribeBox>
        </StyledFooter>
      </Parallax>
    </Box>
  );
};

export default Footer;
