import { ReactNode } from "react";

type AuthButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

function Button({ children, className, onClick, name, type }: AuthButtonProps) {
  return (
    <button
      type={type}
      name={name}
      className={`rounded-md bg-light-main py-2 font-medium text-white hover:bg-main ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
