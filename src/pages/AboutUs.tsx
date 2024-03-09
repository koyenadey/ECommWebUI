import { useEffect, useRef } from "react";

import { Box, Container } from "@mui/material";
import {
  StyledAboutDesc,
  StyledInfoSections,
  StyledSectionBox,
} from "../styles/styles";
import MasterPage from "../components/master-page/MasterPage";
import { useLocation } from "react-router-dom";
import useFetchToken from "../hook/useFetchUser";

const AboutUs = () => {
  useFetchToken();
  const location = useLocation();
  const data = location.state;

  const aboutSection = useRef<HTMLDivElement>(null);
  const shippingSection = useRef<HTMLDivElement>(null);
  const custCareSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data === "aboutus" && aboutSection.current !== null) {
      aboutSection.current.scrollIntoView({ behavior: "smooth" });
    }
    if (data === "shipping" && shippingSection.current !== null) {
      shippingSection.current.scrollIntoView({ behavior: "smooth" });
    }
    if (data === "customercare" && custCareSection.current !== null) {
      custCareSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <MasterPage>
      <Container component="div" aria-label="Information-Section">
        <StyledSectionBox ref={shippingSection} component="section">
          <StyledInfoSections>Shipping & Returns</StyledInfoSections>
          <StyledAboutDesc component="article">
            I’m a shipping policy section. I’m a great place to update your
            customers about your shipping methods, packaging and costs. Use
            plain, straightforward language to build trust and make sure that
            your customers stay loyal! I’m a return policy section. I’m a great
            place to let your customers know what to do in case they’ve changed
            their mind about their purchase, or if they’re dissatisfied with a
            product. Having a straightforward refund or exchange policy is a
            great way to build trust and reassure your customers that they can
            buy with confidence.
          </StyledAboutDesc>
        </StyledSectionBox>
        <StyledSectionBox ref={aboutSection} component="section">
          <StyledInfoSections variant="h3">About Us</StyledInfoSections>
          <StyledAboutDesc component="article">
            Becoming no. 1 fashion destination is not an easy feat. Sincere
            efforts, digital enhancements and a team of dedicated personnel with
            an equally loyal customer base have made ModaMorph the online
            platform that it is today. The original B2B venture for personalized
            gifts was conceived in 2020 but transitioned into a full-fledged
            ecommerce giant within a span of just a few years. By 2022,
            ModaMorph had introduced multiple international brands to its
            platform, and this has only grown in number each passing year. Today
            ModaMorph sits on top of the online fashion game with an astounding
            social media following, a loyalty program dedicated to its
            customers, and tempting, hard-to-say-no-to deals.
          </StyledAboutDesc>
        </StyledSectionBox>
        <StyledSectionBox ref={custCareSection} component="section">
          <StyledInfoSections variant="h3">Customer Care</StyledInfoSections>
          <StyledAboutDesc component="article">
            I’m a customer care section. I’m a great place to write a long text
            about your company and your services, and, most importantly, how to
            contact your store with queries. Writing a detailed customer care
            policy is a great way to build trust and reassure your customers
            that they can buy with confidence. I'm the second paragraph in your
            customer care section. Click here to add your own text and edit me.
            It’s easy. Just click “Edit Text” or double click me to add details
            about your policy and make changes to the font. I’m a great place
            for you to tell a story and let your users know a little more about
            you.
          </StyledAboutDesc>
        </StyledSectionBox>
      </Container>
    </MasterPage>
  );
};

export default AboutUs;
