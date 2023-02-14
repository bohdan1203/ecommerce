import { Link } from "react-router-dom";
import Button from "./ui/Button";

const AuthForm = ({
  children,
  title,
  message,
  submitDisabled,
  submitText,
  alternative,
  linkHref,
  linkText,
  onSubmit,
}) => {
  return (
    <div className="w-100 h-screen flex flex-col items-center justify-center">
      <form
        className="border rounded h-fit w-72 py-3 px-5 flex flex-col bg-white"
        onSubmit={onSubmit}
      >
        <h1 className="text-center text-3xl font-semibold mb-5">{title}</h1>
        {message && <p className="text-red-400 mb-3 max-w-16">{message}</p>}
        {children}
        <Button
          type="submit"
          disabled={submitDisabled}
          textContent={submitText}
        />
      </form>
      <p className="mt-4">
        {alternative}{" "}
        <Link className="text-blue-600" to={linkHref}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
