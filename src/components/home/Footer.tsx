import React from "react";
import { useNavigate } from "react-router-dom";
import { footerData } from "../../data/data";

import {
  CustomFooter,
  StyledBtnFooter,
  StyledCopyrightIcon,
  StyledCopyrightText,
  StyledFacebookIcon,
  StyledInformation,
  StyledInstagramIcon,
  StyledYoutubeIcon,
  SubscribeBox,
  SubscribeBtn,
  SubscribeText,
} from "../../styles/styles";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <CustomFooter>
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
        <SubscribeText placeholder="Enter your email here" variant="outlined" />
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
    </CustomFooter>
  );
};

export default Footer;
