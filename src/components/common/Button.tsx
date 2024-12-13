import { ReactNode } from "react";

type AuthButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

function Button({ children, className, onClick, name, type }: AuthButtonProps) {
  const hover = className?.split(" ").find((x) => x.match("hover:"));
  const bg = className?.split(" ").find((x) => x.match("bg-"));
  const text = className?.split(" ").find((x) => x.match("text-"));

  return (
    <button
      type={type}
      name={name}
      className={`rounded-md ${bg?.length ? bg : "bg-main"} ${hover?.length ? hover : "hover:bg-light-main"} ${text?.length ? text : "text-white"} py-2 font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
