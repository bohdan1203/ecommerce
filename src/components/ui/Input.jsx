const Input = ({ id, label, type, onChange, onBlur }) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        className="border rounded py-1 px-3 outline-blue-600"
        type={type}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
