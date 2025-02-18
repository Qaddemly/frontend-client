import { Link } from "react-router-dom";

function Logo({
  fontSize = "text-5xl",
  textColor = "text-main",
  className,
}: {
  fontSize?: string;
  textColor?: string;
  className?: string;
}) {
  return (
    <Link
      to="/"
      className={`${className ? className : `${fontSize} font-semibold ${textColor}`}`}
    >
      Qaddemly
    </Link>
  );
}

export default Logo;
