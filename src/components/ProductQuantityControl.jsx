import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addProductToCart,
  deleteProductFromCart,
  changeQuantity,
} from "../features/cartSlice";

function ProductQuantityControl({ product }) {
  const { cart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productInCart = cart.find((item) => item.id === product.id);

  const quantity = productInCart?.quantity || 0;
  const showAddToCart = !quantity;
  const showControls = !!quantity;

  return (
    <Fragment>
      {showControls && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between items-center">
            <button
              className="border p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
              onClick={() =>
                dispatch(
                  quantity === 1
                    ? deleteProductFromCart({
                        productId: product.id,
                        cartId: currentUser.cartId,
                      })
                    : changeQuantity({
                        productId: product.id,
                        cartId: currentUser.cartId,
                        newQuantity: quantity - 1,
                      })
                )
              }
            >
              -
            </button>
            <span className="mx-3">{productInCart.quantity}</span>
            <button
              className="border p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
              onClick={() =>
                dispatch(
                  changeQuantity({
                    productId: product.id,
                    cartId: currentUser.cartId,
                    newQuantity: quantity + 1,
                  })
                )
              }
            >
              +
            </button>
          </div>
          <button
            className="border py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-700 mt-2"
            onClick={() =>
              dispatch(
                deleteProductFromCart({
                  productId: product.id,
                  cartId: currentUser.cartId,
                })
              )
            }
          >
            Remove from Cart
          </button>
        </div>
      )}
      {showAddToCart && (
        <button
          className="border p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
          onClick={() =>
            currentUser
              ? dispatch(
                  addProductToCart({
                    productId: product.id,
                    cartId: currentUser.cartId,
                  })
                )
              : navigate("/login")
          }
        >
          Add to Cart
        </button>
      )}
    </Fragment>
  );
}

export default ProductQuantityControl;
