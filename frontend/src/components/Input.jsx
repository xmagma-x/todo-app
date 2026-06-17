function Input({ className, type, ...props }) {
  return (
    <input
      type={type || "text"}
      className={`w-full bg-zinc-200 rounded-md p-2 mt-2 outline-none ${className}`}
      {...props}
    />
  );
}

export default Input;
