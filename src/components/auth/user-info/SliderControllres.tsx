import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SliderControllres({
  step,
  setStep,
}: {
  step: number;
  setStep: (s: (prevStep: number) => number) => void;
}) {
  return (
    <div className="justify-round items-centers absolute top-[50%] flex w-full justify-around gap-[30rem]">
      <button
        type="button"
        disabled={step === 1}
        className={`flex items-center justify-center rounded-full ${step === 1 ? "bg-background text-background shadow-none hover:bg-background hover:text-background" : "bg-white"} p-3 text-main shadow-md hover:bg-secondary hover:text-white`}
        onClick={() => setStep((s) => s - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-7 w-7" />
      </button>

      <button
        type="button"
        disabled={step === 5}
        className={`flex items-center justify-center rounded-full ${step === 5 ? "bg-background text-background shadow-none hover:bg-background hover:text-background" : "bg-white"} p-3 text-main shadow-md hover:bg-secondary hover:text-white`}
        onClick={() => setStep((s) => s + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-7 w-7" />
      </button>
    </div>
  );
}

export default SliderControllres;
