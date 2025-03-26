import { Link } from "react-router-dom";

type AuthLinkProps = {
  msg: string;
  to?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function AuthLink({ msg, to, text, onClick }: AuthLinkProps) {
  return (
    <p className="text-center text-gray-700">
      {msg}{" "}
      {to && (
        <Link to={to} className="font-medium text-main underline">
          {text}
        </Link>
      )}
      {onClick && (
        <button className="font-medium text-main underline" onClick={onClick}>
          {text}
        </button>
      )}
    </p>
  );
}

export default AuthLink;
