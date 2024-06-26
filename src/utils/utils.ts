import { amber } from "@mui/material/colors";
import {
  BreadCrumbsType,
  Category,
  CreateProductType,
  Order,
  OrderProductType,
  RegisterFormType,
} from "../misc/type";
import { CreateReview } from "../components/reviews/ReviewSection";

export const numbersArray = (value: number): number[] => {
  return Array.from({ length: value }, (_, i) => i + 1);
};

export const transformToFormData = (data: CreateProductType): FormData => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("categoryId", data.categoryId);
  formData.append("inventory", data.inventory.toString());
  if (data.images && data.images.length > 0) {
    const imagesFile = data.images[0];
    formData.append("images", imagesFile);
  } else formData.append("images", "");
  return formData;
};

export const transformToFormDataUser = (data: RegisterFormType): FormData => {
  const formData = new FormData();

  formData.append("userName", data.UserName);
  formData.append("email", data.Email);
  formData.append("password", data.Password);
  formData.append("addresLine1", data.AddresLine1);
  formData.append("city", data.City);
  formData.append("street", data.Street);
  formData.append("country", data.Country);
  formData.append("postcode", data.Postcode);
  formData.append("phoneNumber", data.PhoneNumber);
  formData.append("landmark", data.Landmark);

  if (data.Avatar && data.Avatar.length > 0) {
    const imagesFile = data.Avatar[0];
    formData.append("avatar", imagesFile);
  } else formData.append("avatar", data.UserName[0]);
  return formData;
};

export const calculateTotalSum = (orders: Order[]) => {
  orders.map((order) => {
    let sum = 0.0;
    const totalPrice: number = calculateProductPrice(order.orderedProducts);
    sum = sum + totalPrice;
    return sum;
  });
};

const calculateProductPrice = (products: OrderProductType[]): number => {
  let tot = 0.0;
  products.map((product) => {
    tot += product.priceAtPurchase * product.quantity;
  });
  return tot;
};

export const transformOrders = (orders: Order[]) => {
  return orders.map((order) => {
    const totalPrice: number = calculateProductPrice(order.orderedProducts);
    return { ...order, totalPrice };
  });
};

export const transFormBreadCrumbs = (
  breadcrumbsValue: string
): BreadCrumbsType[] => {
  return [
    { label: "home", href: "/" },
    { label: "products", href: breadcrumbsValue },
  ];
};

export const transformToReviewForm = (data: CreateReview): FormData => {
  const formData = new FormData();

  formData.append("rating", data.rating.toString());
  formData.append("comment", data.comment);
  formData.append("userId", data.userId);
  formData.append("orderedProductId", data.orderProductId);

  return formData;
};

export const getFormattedDate = (dateString: Date): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  // Format the date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
