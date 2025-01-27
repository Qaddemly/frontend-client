import { Link } from "react-router-dom";

function Logo({
  fontSize = "text-5xl",
  textColor = "text-main",
}: {
  fontSize?: string;
  textColor?: string;
}) {
  return (
    <Link to="/" className={`${fontSize} font-semibold ${textColor}`}>
      Qaddemly
    </Link>
  );
}

export default Logo;
