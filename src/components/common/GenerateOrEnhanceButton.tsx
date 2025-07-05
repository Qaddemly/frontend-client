import Button from "./Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

function GenerateOrEnhanceButton({
  className,
  text,
  onClick,
  noAnimation,
}: {
  className: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  noAnimation?: boolean;
}) {
  return (
    <div className={`group absolute ${className}`}>
      <Button
        onClick={onClick}
        type="button"
        className={`relative rounded-full p-3 ${noAnimation ? "animate-none" : "animate-bounce"}`}
      >
        <FontAwesomeIcon icon={faBolt} />
      </Button>

      {/* Tooltip */}
      <span className="absolute bottom-11 right-1/2 z-10 mb-2 translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </div>
  );
}

export default GenerateOrEnhanceButton;
