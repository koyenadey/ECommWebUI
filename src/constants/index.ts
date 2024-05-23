const baseUrl = "https://modamorph.azurewebsites.net/";
//swagger : https://modamorph.azurewebsites.net/swagger/index.html

//Products url
export const GETURL: string = baseUrl + "api/v1/products";
export const GETProdURL: string = baseUrl + "api/v1/product";
export const GET_COUNTURL: string = baseUrl + "api/v1/products/meta";
export const GETCATPRD_COUNTURL: string = baseUrl + "api/v1/products/category";

//Users url
export const USER_GETURL: string = baseUrl + "api/v1/users"; //"https://api.escuelajs.co/api/v1/users";
export const USER_CHECKMAIL: string = baseUrl + "api/v1/users/email-exists";
export const LOGGEDIN_USERURL: string = baseUrl + "api/v1/auth/profile"; //"https://api.escuelajs.co/api/v1/auth/profile";
export const USER_ADDRESSURL: string = baseUrl + "api/v1/addresses";
export const USER_DefADDRESSURL: string = baseUrl + "api/v1/addresses/default";
export const USER_LOGINURL: string = baseUrl + "api/v1/auth/login"; //"https://api.escuelajs.co/api/v1/auth/login";

export const USER_UPDATEURL: string = baseUrl + "api/v1/users";

//Pagination
export const PAGESIZE = 10;

//Categories
export const CATGET_URL = baseUrl + "api/v1/categories";
//"https://api.escuelajs.co/api/v1/categories";

//Orders
export const ORDER_GETURL = baseUrl + "api/v1/orders";
