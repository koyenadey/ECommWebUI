import { Inventory } from "@mui/icons-material";
import { StringLiteral } from "typescript";

export type Category = {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type CreateCategory = Omit<Category, "id">;

type ProductImage = {
  productId: string;
  productImageUrl: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductsList = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  images: ProductImage[];
  creationAt: string;
  inventory: number;
  weight: number;
  updatedAt: string;
};

export type CreateProductType = {
  name: string;
  price: number;
  description: string;
  images: FileList;
  inventory: number;
  weight: number;
  categoryId: string;
};

export type CreateProductType1 = {
  pname: string;
  price: number;
  description: string;
  images: FileList;
  inventory: number;
  weight: number;
  categoryId: string;
};

export type UpdateProductType = {
  price: number;
  inventory: number;
};

//export type UpdateProductType = Omit<CreateProductType, "images">;

export type ProductCart = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
  quantity: number;
};

export type UpdateProductCart = {
  productId: string;
  quantity: number;
};

export type UserType = {
  id: string;
  email: string;
  password: string;
  userName: string;
  role: string;
  avatar: string;
};

export type CreateUserType = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export type AddressUserType = {
  id: string;
  userName: string;
  email: string;
};

export type AddressType = {
  id: string;
  user: AddressUserType;
  addressLine: string;
  street: string;
  city: string;
  country: string;
  postcode: string;
  phoneNumber: string;
  landmark: string;
};

export type Token = {
  refreshToken: string;
};

export type RegisterFormType = {
  UserName: string;
  Email: string;
  Password: string;
  Avatar?: FileList;
  AddresLine1: string;
  Street: string;
  City: string;
  Postcode: string;
  Country: string;
  PhoneNumber: string;
  Landmark: string;
};

export type OrderUserType = {
  userId: string;
  userName: string;
  email: string;
};

export type OrderAddressType = {
  id: string;
  user: OrderUserType;
  addressLine: string;
  street: string;
  city: string;
  country: string;
  postcode: string;
  phoneNumber: string;
  landmark: string;
};

export type OrderProductType = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  priceAtPurchase: number;
};

export type Order = {
  id: string;
  orderDate: Date;
  status: string;
  user: UserType;
  dateOfDelivery: Date;
  address: OrderAddressType;
  orderedProducts: OrderProductType[];
};

export type ReadOrder = {
  id: string;
  orderDate: Date;
  totalPrice: number;
  status: string;
  user: UserType;
  dateOfDelivery: Date;
  address: OrderAddressType;
  orderedProducts: OrderProductType[];
};

export type OrderedProductsType = {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
};

export type CreateOrdersType = {
  userId: string;
  addressId: string;
  orderedProducts: OrderedProductsType[];
};

export type UpdateOrderType = {
  status: string;
  dateOfDelivery: Date;
};

export type BreadCrumbsType = {
  label: string;
  href: string;
};

export interface WishlistItem {
  id: string;
  product: Product;
}
export interface WishlistType {
  id: string;
  name: string;
  user: UserType;
  wishlistItems: WishlistItem[];
}
