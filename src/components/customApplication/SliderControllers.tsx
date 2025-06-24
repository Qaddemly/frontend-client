import Button from "../common/Button";
import toast from "react-hot-toast";

interface SliderControllersProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
  validateStep: () => Promise<boolean>;
}

function SliderControllers({
  currentStep,
  onNext,
  onSubmit,
  onPrev,
  isLastStep,
  isSubmitting,
  validateStep,
}: SliderControllersProps) {
  const handleClick = async () => {
    const isValid = await validateStep();
    if (!isValid) {
      toast.error("Please fill all required fields ");
      return;
    } else onNext();
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between gap-2 sm:gap-4 md:gap-6">
          {currentStep > 1 && (
            <Button onClick={onPrev} type="button" className="w-full">
              Previous
            </Button>
          )}

          {!isLastStep ? (
            <Button
              type="button"
              onClick={() => handleClick()}
              className="w-full"
            >
              Next
            </Button>
          ) : (
            <Button
              className="w-full bg-green-100 hover:bg-green-200"
              onClick={() => onSubmit()}
              disabled={isSubmitting}
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default SliderControllers;
