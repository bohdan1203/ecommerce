const Button = ({ type, textContent, disabled, onClick }) => {
  return (
    <button
      className={`border rounded py-1 px-12  text-white mx-auto ${
        disabled ? "bg-blue-200" : "bg-blue-600"
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {textContent}
    </button>
  );
};

export default Button;
