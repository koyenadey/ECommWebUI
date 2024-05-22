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
      name: product.name,
      price: product.price,
      description: product.description,
      images: [
        {
          productId: "1",
          imageUrl: "example1.jpg",
          id: "1",
          createdAt: "",
          updatedAt: "",
        },
      ],
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

  http.put(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ request }) => {
      const pathSegments = new URL(request.url).pathname.split("/");
      const productId = pathSegments[pathSegments.length - 1];
      if (!productId) return new HttpResponse(null, { status: 404 });

      const productToUpdate = mockProducts.find(
        (product) => product.id === productId
      );

      const product = (await request.json()) as ProductsList;

      if (!productToUpdate) return new HttpResponse(null, { status: 400 });

      productToUpdate.name = product.name;
      productToUpdate.price = product.price;
      productToUpdate.description = product.description;
      productToUpdate.category.id = product.category.id;

      return HttpResponse.json(productToUpdate, { status: 204 });
    }
  ),
];

export const productServer = setupServer(...handler);
