import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, emptyCart } from "../features/cartSlice";
import ProductQuantityControl from "./ProductQuantityControl";

import { getNumberFromPriceString } from "../utilities/getNumberFromPriceString";
import { getPriceStringFromNumber } from "../utilities/getPriceStringFromNumber";

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartProducts = cart.map((item) => {
    const existingProduct = products.find((product) => product.id === item.id);
    return { ...existingProduct, quantity: item.quantity };
  });

  const totalAmount = cartProducts.reduce((total, product) => {
    return total + product.quantity * getNumberFromPriceString(product.price);
  }, 0);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-lg font-medium mb-5">Your Cart</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Overall</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      className="w-14 h-14"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <ProductQuantityControl product={product} />
                </td>
                <td className="border px-4 py-2">
                  <span className="flex justify-center items-center">
                    {product.price}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <span className="flex justify-center items-center">
                    {getPriceStringFromNumber(
                      getNumberFromPriceString(product.price) * product.quantity
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="text-lg font-medium mb-5">
          Total: <span>{getPriceStringFromNumber(totalAmount)}</span>
        </h1>

        <div className="flex justify-between mt-5">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => dispatch(emptyCart(currentUser.cartId))}
          >
            Empty Cart
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => dispatch(toggleCart(false))}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
