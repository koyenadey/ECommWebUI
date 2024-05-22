import { CreateProductType, RegisterFormType } from "../misc/type";

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
