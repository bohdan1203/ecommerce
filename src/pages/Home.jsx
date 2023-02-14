import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";

function Home() {
  const { products } = useSelector((state) => state.products);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
}

export default Home;
