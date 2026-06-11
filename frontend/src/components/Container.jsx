function Container({ children, className }) {
  return (
    <div
      className={`min-h-screen bg-linear-to-br from-zinc-300 to-zinc-500 ${className || ""}`}
    >
      {children}
    </div>
  );
}

export default Container;
