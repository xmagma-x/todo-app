function Input({ className, type, ...props }) {
  return (
    <input
      type={type || "text"}
      className={`bg-zinc-200 rounded-md m-2 p-2 outline-none ${className}`}
      {...props}
    />
  );
}

export default Input;
