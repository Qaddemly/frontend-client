import { Link } from "react-router-dom";

function Logo({ fontSize = "text-5xl" }: { fontSize?: string }) {
  return (
    <Link to="/" className={`${fontSize} font-semibold text-main`}>
      Qaddemly
    </Link>
  );
}

export default Logo;
