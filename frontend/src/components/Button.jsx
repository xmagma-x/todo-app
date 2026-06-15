function Button({ children, onClick, className, props }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 m-2 rounded-m transition rounded-md  ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
