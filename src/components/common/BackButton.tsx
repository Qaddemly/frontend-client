import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  fallbackUrl?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

function BackButton({
  fallbackUrl,
  top = "top-[90px]",
  left = "left-9",
  right,
  bottom,
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (fallbackUrl) {
      navigate(fallbackUrl);
    } else {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        toast.error("No previous page to go back to.");
      }
    }
  };

  const positionClasses = ["absolute", "z-50", top, left, right, bottom]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={positionClasses}>
      <button
        onClick={handleGoBack}
        className="transition-opacity hover:opacity-80"
      >
        <FontAwesomeIcon icon={faCircleLeft} className="text-5xl text-main" />
      </button>
    </div>
  );
}

export default BackButton;
