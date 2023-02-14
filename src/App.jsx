import { Fragment, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Header from "./components/Header";
import Cart from "./components/Cart";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";

import { setCurrentUser } from "./features/authSlice";
import { getAllProducts } from "./features/productsSlice";
import { getUserCart } from "./features/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { observeUser } = useAuth();

  const { showCart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = observeUser((user) => {
      if (user) {
        const [username, id] = user.displayName.split("/");

        dispatch(
          setCurrentUser({
            id: user.uid,
            cartId: id,
            email: user.email,
            username,
          })
        );
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserCart(currentUser.cartId));
    }
  }, [currentUser]);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:productId" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {showCart && <Cart />}
    </Fragment>
  );
}

export default App;
