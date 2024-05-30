import React from "react";
import { Box, Typography, Container, Icon, Divider } from "@mui/material";
import styled from "@emotion/styled";
import { Feature, FeatureIcon, Section } from "../../styles/styles";
import footerFeatureOne from '../../images/footer-feature-1.png';
import footerFeatureTwo from '../../images/footer-feature-2.png';
import footerFeatureThree from '../../images/footer-feature-3.png';
import footerFeatureFour from '../../images/footer-feature-4.png';

interface FooterFeaturesProps {
  spacing?: number; // Optional prop for spacing if needed
}

// Create a type for the feature
interface FeatureType {
  icon: string;
  title: string;
  description: string;
}

// Define the features
const features: FeatureType[] = [
  {
    icon: footerFeatureOne,
    title: "Worldwide Shipping",
    description: "We offer worldwide shipping on all orders.",
  },
  {
    icon: footerFeatureTwo,
    title: "Best Quality",
    description: "Our products are of the highest quality.",
  },
  {
    icon: footerFeatureThree,
    title: "Best Offers",
    description: "We provide the best offers on our products.",
  },
  {
    icon: footerFeatureFour,
    title: "Secure Payments",
    description: "Your payments are secure with us.",
  },
];

// Define the component
const FooterFeatures = () => {
  return (
    <Section>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {features.map((feature, index) => (
          <Feature key={index}>
            <FeatureIcon src={feature.icon} alt={feature.title} />
            <Typography variant="body1" component="h5">
              {feature.title}
            </Typography>
            <Typography variant="subtitle1">{feature.description}</Typography>
          </Feature>
        ))}
      </Container>
    </Section>
  );
};

export default FooterFeatures;
