import { useSelector, useDispatch } from "react-redux";
import { toggleCart, resetCartState } from "../features/cartSlice";

import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Button from "./ui/Button";

function Header() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { logout } = useAuth();
  const { currentUser } = useSelector((state) => state.auth);

  function logoutHander() {
    logout().catch((error) => alert(error.message));
    dispatch(resetCartState());
  }

  return (
    <header className="w-full bg-yellow-500 p-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-800">Pay & Get</h1>
      {currentUser && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => dispatch(toggleCart())}
        >
          Cart{" "}
          <span className="text-lg font-medium">
            ({cart.reduce((acc, cur) => acc + cur.quantity, 0)})
          </span>
        </button>
      )}

      {currentUser ? (
        <div>
          email: {currentUser.email} <br />
          username: {currentUser.username} <br />
          id: {currentUser.id} <br />
          cartId: {currentUser.cartId} <br />
          <Button textContent="Logout" onClick={logoutHander} />
        </div>
      ) : (
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          to="/login"
        >
          Log In / Sign Up
        </Link>
      )}
    </header>
  );
}

export default Header;
