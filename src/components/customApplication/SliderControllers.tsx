import { useFormContext } from "react-hook-form";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";

interface SliderControllersProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (data: IApplicationData) => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
  isStepValid: boolean;
}

function SliderControllers({
  currentStep,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  isSubmitting = false,
  isStepValid,
}: SliderControllersProps) {
  const { handleSubmit, getValues } = useFormContext<IApplicationData>(); // استخدام useFormContext للوصول إلى البيانات

  const handleNext = () => {
    if (isLastStep) {
      const data = getValues();
      onSubmit(data);
    } else {
      onNext();
    }
  };

  return (
    <>
      <div className="mt-6 flex justify-between gap-2 sm:gap-4 md:gap-6">
        {currentStep > 1 ? (
          <>
            <Button onClick={onPrev} type="button" className="p-3">
              <FontAwesomeIcon icon={faArrowLeft} className="px-2" />
              Previous
            </Button>

            <Button
              onClick={handleSubmit(handleNext)}
              type="button"
              className={`p-3 ${isLastStep ? "bg-green-100 hover:bg-green-200" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : isLastStep
                  ? "Submit Application"
                  : "Next"}
              {isLastStep ? (
                ""
              ) : (
                <FontAwesomeIcon icon={faArrowRight} className="px-2" />
              )}
            </Button>
          </>
        ) : (
          <div className="flex w-full justify-center">
            <Button
              onClick={handleSubmit(handleNext)}
              type="button"
              className="w-1/2 max-w-[200px] p-3"
              disabled={isSubmitting}
            >
              Next
              <FontAwesomeIcon icon={faArrowRight} className="px-2" />
            </Button>
          </div>
        )}
      </div>

      {!isStepValid && (
        <div className="text-center text-xl font-semibold text-danger-300">
          Please fill out all fields.
        </div>
      )}
    </>
  );
}

export default SliderControllers;
