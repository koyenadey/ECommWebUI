import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { CATGET_URL, GETURL } from "../../constants";
import { CreateProductType, ProductsList } from "../../misc/type";
import { mockCategories, mockProducts } from "../../data/data";

const handler = [
  http.get(GETURL, () => {
    return HttpResponse.json(mockProducts, { status: 200 });
  }),

  http.get(CATGET_URL, () => {
    return HttpResponse.json(mockCategories, { status: 200 });
  }),

  http.post(GETURL, async ({ request }) => {
    const product = (await request.json()) as CreateProductType;

    const prodToReturn: ProductsList = {
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
      category: {
        id: product.categoryId,
        name: "",
        image: "",
        creationAt: "",
        updatedAt: "",
      },
      id: 3,
      creationAt: "",
      updatedAt: "",
    };
    return HttpResponse.json(prodToReturn, { status: 201 });
  }),
];

export const productServer = setupServer(...handler);
