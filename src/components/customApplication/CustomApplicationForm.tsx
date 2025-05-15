import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import ApplicationPersonal from "./ApplicationPersonal";
import ApplicationEducation from "./ApplicationEducation";
import ApplicationExperience from "./ApplicationExperience";
import ApplicationSkills from "./ApplicationSkills";
import ApplicationResume from "./ApplicationResume";
import ApplicationQuestions from "./ApplicationQuestions";
import SliderControllers from "./SliderControllers";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IApplicationData } from "../../interfaces/CustomApplication.interfaces";
import { useParams } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { useApplyToJobMutation } from "../../services/jobApi";
import toast from "react-hot-toast";

function CustomApplicationForm() {
  const {
    resume,
    answers,
    currentStep,
    nextStep,
    prevStep,
    skills,
    languages,
    setCurrentStep,
    experience,
  } = useApplication();

  const { jobId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasQuestions = true; // API will tell us if business has questions
  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;
  const methods = useForm<IApplicationData>({
    mode: "onTouched",
  });

  const validateStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case 1: // Personal Info
        return await methods.trigger([
          "personal.firstName",
          "personal.lastName",
          "personal.email",
          "personal.phone.number",
          "personal.dob",
        ]);

      case 2: // Education
        return await methods.trigger([
          "education.university",
          "education.fieldOfStudy",
          "education.gpa",
          "education.startDate",
          "education.endDate",
        ]);

      case 3: {
        // Experience
        if (experience.length === 0) return false;
        const experienceValidations = await Promise.all(
          experience.map((_, index) =>
            methods.trigger([
              `experience.${index}.jobTitle`,
              `experience.${index}.companyName`,
              `experience.${index}.location`,
              `experience.${index}.city`,
              `experience.${index}.locationType`,
              `experience.${index}.startDate`,
              `experience.${index}.endDate`,
            ]),
          ),
        );
        return experienceValidations.every((valid) => valid);
      }

      case 4: // Skills & Languages
        return skills.length > 0 && languages.length > 0;

      case 5: // Resume
        console.log("Resume:", resume);
        return !!resume;

      // case 6: Application Questions
      //   return answers.length === questions.length && !answers.includes("");

      default:
        return false;
    }
  };

  const [applyToJob, { isLoading, isError, error }] = useApplyToJobMutation();

  const onSubmit: SubmitHandler<IApplicationData> = async (data) => {
    setIsSubmitting(true);
    const appData = { ...data, skills, languages, experience };
    const appAnswers = hasQuestions ? answers : null;
    if (!jobId) {
      console.error("Job ID is missing");
      toast.error("Job ID is required to submit the application.");
      setIsSubmitting(false);
      return;
    }

    console.log("Submitting application:", {
      jobId,
      appData,
      resume,
      appAnswers,
    });

    try {
      await applyToJob({
        id: jobId,
      }).unwrap();

      toast.success("Application submitted successfully!");
      setCurrentStep(1);
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="relative m-6 mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md">
            <div className="flex flex-col gap-6">
              <h2 className="text-center text-2xl font-bold">
                {currentStep === 1 && "Personal Info"}
                {currentStep === 2 && "Education"}
                {currentStep === 3 && "Experiences"}
                {currentStep === 4 && "Skills & Languages"}
                {currentStep === 5 && "Upload Your Resume"}
                {hasQuestions && currentStep === 6 && "Application Questions"}
              </h2>

              {currentStep === 1 && <ApplicationPersonal />}
              {currentStep === 2 && <ApplicationEducation />}
              {currentStep === 3 && <ApplicationExperience />}
              {currentStep === 4 && <ApplicationSkills />}
              {currentStep === 5 && <ApplicationResume />}
              {hasQuestions && currentStep === 6 && <ApplicationQuestions />}

              <SliderControllers
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting || isLoading}
                isLastStep={isLastStep}
                isSubmitting={isSubmitting}
                validateStep={validateStep}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </MainLayout>
  );
}

export default CustomApplicationForm;
