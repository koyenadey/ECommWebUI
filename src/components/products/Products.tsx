import { useSelector } from "react-redux";
import { AppState } from "../store/store";
import Navbar from "../navigation/NavBar";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const products = useSelector(
    (state: AppState) => state.productReducer.products
  );
  const isLoading = useSelector(
    (state: AppState) => state.productReducer.isLoading
  );
  const error = useSelector((state: AppState) => state.productReducer.error);

  const productDetailsHandler = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  else if (error) {
    console.log(error);
    return <>{error}</>;
  }
  console.log(products);
  return (
    <>
      <Navbar />
      <div>
        {products.map((item) => (
          <article key={item.id}>
            <p>{item.title}</p>
            <button onClick={() => productDetailsHandler(item.id)}>
              Show Details
            </button>
          </article>
        ))}
      </div>
    </>
  );
};

export default Products;
