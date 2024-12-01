import GoogleLogo from "../common/GoogleLogo";

function GoogleButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-10 flex w-full items-center rounded-md border-2 border-gray-100 px-2 py-1"
    >
      <GoogleLogo />
      <p className="m-auto font-semibold">{text}</p>
    </button>
  );
}

export default GoogleButton;
