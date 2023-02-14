import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductInfo from "../components/ProductInfo";
import RatingSelect from "../components/RatingSelect";
import ProductQuantityControl from "../components/ProductQuantityControl";
import AddReview from "../components/AddReview";
import ReviewsList from "../components/ReviewsList";

function Product() {
  const { productId } = useParams();
  const { products } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.auth);
  const product = products.find((product) => product.id === productId);

  if (product) {
    return (
      <div className="flex flex-col items-center p-10">
        <Link to="/" className="text-xl underline mb-5">
          Back to Products
        </Link>
        <ProductInfo product={product} />
        <ProductQuantityControl product={product} />
        <RatingSelect product={product} />

        <div className="mt-5 max-w-sm">
          <h2 className="text-lg font-medium text-gray-700">Reviews</h2>
          {currentUser && <AddReview product={product} />}
          <ReviewsList product={product} />
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default Product;
