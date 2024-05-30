import React from "react";
import { Typography, Box, Avatar, Rating } from "@mui/material";
import { styled } from "@mui/system";
import { OrderedProductsType, UserType } from "../../misc/type";

export interface ReviewI {
  id?: number;
  name: string;
  date: string;
  rating: number;
  review: string;
  avatarUrl?: string;
}

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  user: UserType;
  date: string;
  reviewDate: Date;
  orderedProduct: OrderedProductsType;
  images: string[];
}

interface ReviewItemProps {
  review: Review;
}

const ReviewContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: theme.spacing(4),
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const ReviewContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
}));

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <ReviewContainer>
      <AvatarWrapper>
        <Avatar alt={review.user.userName} src={review.user.avatar} />
      </AvatarWrapper>
      <ReviewContent>
        <Typography variant="body1" component="div">
          <strong>{review.user.userName}</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {review.reviewDate.toLocaleString()}
        </Typography>
        <Rating value={review.rating} precision={0.5} readOnly />
        <Typography variant="body1">{review.comment}</Typography>
      </ReviewContent>
    </ReviewContainer>
  );
};

export default ReviewItem;
