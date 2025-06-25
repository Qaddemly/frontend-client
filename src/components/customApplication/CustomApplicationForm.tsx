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
import { createFormData, handleApiError } from "../../utils/helpers.ts";
import {
  useApplyToJobMutation,
  useGetJobQuestionsQuery,
} from "../../services/jobApi.ts";
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
    experiences,
    educations,
  } = useApplication();

  const { jobId } = useParams();

  const [applyToJob] = useApplyToJobMutation();
  const { data } = useGetJobQuestionsQuery({ jobId: jobId?.toString() || "" });
  const jobQuestions = data?.questions?.questions;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasQuestions = Array.isArray(jobQuestions) && jobQuestions.length > 0;
  const totalSteps = hasQuestions ? 6 : 5;
  const isLastStep = currentStep === totalSteps;
  const methods = useForm<IApplicationData>({
    mode: "onTouched",
  });
  console.log(currentStep, isLastStep);

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
        return (await educations.length) > 0;

      case 3: // Experience
        return (await experiences.length) > 0;

      case 4: // Skills & Languages
        return skills.length > 0 && languages.length > 0;

      case 5: // Resume
        return !!resume;

      case 6: // Application Questions
        return (await answers.length) > 0;

      default:
        return false;
    }
  };

  const onSubmit: SubmitHandler<IApplicationData> = async (data) => {
    if (isLastStep) {
      setIsSubmitting(true);
      const appData = { ...data, skills, languages, experiences };
      const appAnswers = hasQuestions ? answers : null;

      console.log("Submitting application:", {
        jobId,
        appData,
        resume,
        appAnswers,
        educations,
      });
      const formData = createFormData({
        personalInfo: {
          first_name: data?.personal?.firstName,
          last_name: data?.personal?.lastName,
          email: data?.personal?.email,
          phone: data?.personal?.phone?.number,
          country_code: data?.personal?.phone?.countryCode,
          birth_date: data?.personal?.dob,
        },
        experiences,
        educations,
        skills,
        languages,
        answers,
        resume,
      });

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const res = applyToJob({ data: formData, jobId: jobId || "" }).unwrap();
        toast.promise(res, {
          loading: "Submitting your application...",
          success: "Application submitted successfully!",
          error: "Failed to submit application. Please try again.",
        });
        await res;
      } catch (error) {
        handleApiError(error);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 bg-[#eee] py-20"
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
              {hasQuestions && currentStep === 6 && (
                <ApplicationQuestions questions={jobQuestions} />
              )}

              <SliderControllers
                onSubmit={methods.handleSubmit(onSubmit)}
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={nextStep}
                onPrev={prevStep}
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
