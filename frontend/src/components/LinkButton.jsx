import { Link } from "react-router";

function LinkButton({ children, className, to }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 m-2 rounded-m transition rounded-md shadow-md hover:shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
