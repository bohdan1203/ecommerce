import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

import AuthForm from "../components/AuthForm";
import Input from "../components/ui/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errorMessage } = useSelector((state) => state.auth);

  const { login } = useAuth();

  return (
    <AuthForm
      title="Log In"
      submitText="Log In"
      message={errorMessage}
      alternative="Need an account?"
      linkHref="/signup"
      linkText="Sign up."
      onSubmit={(e) => {
        e.preventDefault();
        login(email, password);
      }}
    >
      <Input
        id="email"
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link
        className="block text-center mb-3 text-blue-600"
        to="/forgot-password"
      >
        Forgot Password?
      </Link>
    </AuthForm>
  );
}

export default Login;
