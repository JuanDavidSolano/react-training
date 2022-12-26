import { useParams } from "react-router-dom";
import ProductInfo from "../components/Product/ProductInfo/ProductInfo";

const Product = () => {
  const params = useParams();

  return (
    <section>
      <ProductInfo id={params.productId} />
    </section>
  );
};

export default Product;
