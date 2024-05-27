import React from "react";
import { Box, Typography, Container, Icon, Divider } from "@mui/material";
import styled from "@emotion/styled";
import { Feature, FeatureIcon, Section } from "../../styles/styles";

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
    icon: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/globe-free-img-100x100.png",
    title: "Worldwide Shipping",
    description: "We offer worldwide shipping on all orders.",
  },
  {
    icon: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/quality-free-img-100x100.png",
    title: "Best Quality",
    description: "Our products are of the highest quality.",
  },
  {
    icon: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/tag-free-img-100x100.png",
    title: "Best Offers",
    description: "We provide the best offers on our products.",
  },
  {
    icon: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/lock-free-img-100x100.png",
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
