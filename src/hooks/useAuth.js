import axios from "axios";
import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, setErrorMessage } from "../features/authSlice";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signup(email, password, username) {
    dispatch(setErrorMessage(""));

    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredentials.user;

      const response = await axios.post(
        "https://ecommerce-beabb-default-rtdb.europe-west1.firebasedatabase.app/carts.json",
        { email: user.email, id: user.uid }
      );

      const id = response.data.name;

      await user.updateProfile({
        displayName: username + "/" + id,
      });

      dispatch(
        setCurrentUser({
          id: user.uid,
          cartId: id,
          email,
          username,
        })
      );

      navigate("/");
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
  }

  async function login(email, password) {
    dispatch(setErrorMessage(""));

    try {
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      const user = userCredentials.user;

      const [username, id] = user.displayName.split("/");

      dispatch(
        setCurrentUser({
          id: user.uid,
          cartId: id,
          email: user.email,
          username,
        })
      );

      navigate("/");
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
  }

  async function logout() {
    try {
      await auth.signOut();
      dispatch(setCurrentUser(null));
    } catch (error) {
      alert(error.message);
    }
  }

  function observeUser(callback) {
    return auth.onAuthStateChanged(callback);
  }

  return { signup, login, logout, observeUser };
}
