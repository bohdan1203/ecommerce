import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import AuthForm from "../components/AuthForm";
import Input from "../components/ui/Input";
import { useSelector } from "react-redux";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup } = useAuth();

  const { errorMessage } = useSelector((state) => state.auth);

  const inputsAreValid =
    username && email && password && password === confirmPassword;

  return (
    <AuthForm
      title="Sign Up"
      message={errorMessage}
      submitDisabled={!inputsAreValid}
      submitText="Sign Up"
      alternative="Have an account?"
      linkHref="/login"
      linkText="Log in."
      onSubmit={(e) => {
        e.preventDefault();
        signup(email, password, username);
      }}
    >
      <Input
        id="username"
        label="Username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <Input
        id="password-confirm"
        label="Confirm Password"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </AuthForm>
  );
}

export default Signup;
