import { Link } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ProductQuantityControl from "./ProductQuantityControl";

function ProductItem({ product }) {
  return (
    <li className="shadow-md m-5 p-5 flex flex-col items-center">
      <ProductInfo product={product} />
      <ProductQuantityControl product={product} />
      {product.reviews?.length > 0 && (
        <div className="text-gray-600 text-sm">
          {product.reviews.length} reviews
        </div>
      )}
      <Link
        to={`/${product.id}`}
        className="mt-5 text-blue-500 hover:text-blue-700 font-medium"
      >
        More Details
      </Link>
    </li>
  );
}

export default ProductItem;
