export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type ProductsList = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

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
  productId: number;
  quantity: number;
};

export type UsersList = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
};
