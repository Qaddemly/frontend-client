import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { UserInfoStep } from "../../types/index.types";
import AuthButton from "./AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AuthPrevAndSkipButtons({ setStep }: UserInfoStep) {
  return (
    <div className="mt-5 flex justify-between">
      <AuthButton
        className="flex w-fit items-center gap-2 px-4 py-2"
        onClick={() => setStep((s: number) => s - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Prev</p>
      </AuthButton>
      <AuthButton
        className="flex w-fit items-center gap-2 px-4 py-2"
        onClick={() => setStep((s: number) => s + 1)}
      >
        <p>Skip</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </AuthButton>
    </div>
  );
}

export default AuthPrevAndSkipButtons;
