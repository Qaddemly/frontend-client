import { ReactNode } from "react";

type AuthButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function AuthButton({ children, className, onClick }: AuthButtonProps) {
  return (
    <button
      className={`text-white bg-light-main rounded-md py-2 font-medium hover:bg-main ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default AuthButton;
