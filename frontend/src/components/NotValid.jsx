function NotValid({ valid, children }) {
  return (
    <h2
      className={`p-2 bg-rose-400/30 text-rose-800 mt-1.5 rounded-md ${valid ? "hidden" : ""}`}
    >
      {children}
    </h2>
  );
}

export default NotValid;
