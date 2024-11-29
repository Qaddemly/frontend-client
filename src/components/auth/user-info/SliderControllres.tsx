import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";

function SliderControllres({
  step,
  setStep,
}: {
  step: number;
  setStep: (s: (prevStep: number) => number) => void;
}) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger();

    if (!isValid) {
      console.log("Step validation failed");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="justify-round items-centers step-controller pointer-events-none absolute top-[50%] flex w-full justify-around gap-[30rem]">
      <button
        type="button"
        disabled={step === 1}
        className={`pointer-events-auto flex items-center justify-center rounded-full ${step === 1 ? "bg-background text-background shadow-none hover:bg-background hover:text-background" : "bg-white text-main hover:bg-secondary hover:text-white"} p-3 shadow-md`}
        onClick={handlePrevious}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-7 w-7" />
      </button>

      <button
        type="button"
        disabled={step === 5}
        className={`pointer-events-auto flex items-center justify-center rounded-full ${step === 5 ? "bg-background text-background shadow-none hover:bg-background hover:text-background" : "bg-white text-main hover:bg-secondary hover:text-white"} p-3 shadow-md`}
        onClick={handleNext}
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-7 w-7" />
      </button>
    </div>
  );
}

export default SliderControllres;
