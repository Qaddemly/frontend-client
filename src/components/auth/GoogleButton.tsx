import GoogleLogo from "../common/GoogleLogo";

function GoogleButton({ text }: { text: string }) {
  return (
    <button
      onClick={() =>
        (window.location.href = "http://localhost:8000/api/v1/auth/googleAuth")
      }
      className="mt-10 flex w-full items-center rounded-md border-2 border-gray-100 px-2 py-1"
    >
      <GoogleLogo />
      <p className="m-auto font-semibold">{text}</p>
    </button>
  );
}

export default GoogleButton;
