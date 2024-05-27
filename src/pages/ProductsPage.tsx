//import Products from "../components/products/Products1";
import Products from "../components/products/Products";
import MasterPage from "../components/master-page/MasterPage";
import useFetchProducts from "../hook/useFetchProducts";

const ProductsPage = () => {
  // useFetchProducts();

  return (
    <MasterPage>
      <Products />
    </MasterPage>
  );
};

export default ProductsPage;
