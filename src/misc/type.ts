export type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type CreateCategory = Omit<Category, "id">;

type ProductImage = {
  productId: string;
  imageUrl: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductsList = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: ProductImage[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: ProductImage[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type CreateProductType = {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
};

export type UpdateProductType = Omit<CreateProductType, "images">;

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

export type Token = {
  refreshToken: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
