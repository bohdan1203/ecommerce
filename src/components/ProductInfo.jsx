import { Fragment } from "react";
import { calculateProductsRating } from "../utilities/calculateProductsRating";

function ProductInfo({ product }) {
  return (
    <Fragment>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="shadow-md mb-5 h-64 w-full object-cover"
      />
      <h2 className="text-2xl mb-5">{product.name}</h2>
      <p className="text-base mb-5">{product.description}</p>
      <b className="text-xl mb-5">{product.price}</b>
      <b className="text-xl mb-5">
        {product.ratings.length
          ? `${calculateProductsRating(product.ratings)} / 5 (${
              product.ratings.length
            } ratings)`
          : "No ratings yet"}
      </b>
    </Fragment>
  );
}

export default ProductInfo;
