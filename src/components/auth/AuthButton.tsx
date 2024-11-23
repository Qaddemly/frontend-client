type AuthButtonProps = {
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function AuthButton({ text, className, onClick }: AuthButtonProps) {
  return (
    <button
      className={`text-white bg-light-secondary w-full rounded-md py-2 font-medium hover:bg-main ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default AuthButton;
