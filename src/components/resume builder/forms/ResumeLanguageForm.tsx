import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormMode,
  ILanguagesInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import { useState } from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useAddResumeLanguageMutation,
  useDeleteResumeLanguageMutation,
  useGetAllResumeLanguageQuery,
  useUpdateResumeLanguageMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { useParams } from "react-router-dom";
import ResumeFormButtons from "../ResumeFormButtons.tsx";

function ResumeLanguagesForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<ILanguagesInputs>();
  const indexOfCurrLanguage = resumeInfo?.languages?.findIndex(
    (lang) => lang?.id === currId,
  );

  const { refetch } = useGetAllResumeLanguageQuery({
    resumeId: resumeId || "",
  });
  const [addResumeLanguage] = useAddResumeLanguageMutation();
  const [updateResumeLanguage] = useUpdateResumeLanguageMutation();
  const [deleteResumeLanguage] = useDeleteResumeLanguageMutation();

  const [language, setLanguage] = useState(
    mode === "edit" && resumeInfo?.languages?.[indexOfCurrLanguage]?.language
      ? resumeInfo.languages[indexOfCurrLanguage].language
      : "",
  );

  const [level, setLevel] = useState(
    mode === "edit" && resumeInfo?.languages?.[indexOfCurrLanguage]?.level
      ? resumeInfo.languages[indexOfCurrLanguage].level
      : "",
  );
  const submitForm: SubmitHandler<ILanguagesInputs> = async (data) => {
    const LanguagesData = {
      language: data.language,
      additional_info: data.additional_info,
      level: data.level,
      resume_template_id: data.resume_template_id,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeLanguage({
              data: LanguagesData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeLanguage({
              data: LanguagesData,
              resumeId: resumeId || "",
              languageId: currId.toString() || "",
            }).unwrap(),
          mode,
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement> | ContentEditableEvent,
    field: string,
  ) {
    const value = "target" in e ? e.target.value : e;
    if (field === "language") setLanguage(value);
    if (field === "level") setLevel(value);

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.languages];

      if (mode === "add") {
        const existinglanguage = updatedArray.find(
          (language) => language.id === 303030,
        );
        if (existinglanguage) {
          updatedArray[resumeInfo?.languages?.length - 1] = {
            ...updatedArray[resumeInfo?.languages?.length - 1],
            [field]: value,
          };
        } else {
          const newLanguage = {
            id: 303030,
            language: "",
            additional_info: "",
            level: "",
            resume_template_id: 0,
          } as ILanguagesInputs;
          newLanguage[field] = value;
          updatedArray.push(newLanguage);
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrLanguage]) {
          updatedArray[indexOfCurrLanguage] = {
            ...updatedArray[indexOfCurrLanguage],
            [field]: value,
          };
        }
      }

      return {
        ...prevInfo,
        languages: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeLanguage({
            resumeId: resumeId || "",
            languageId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.languages.filter(
          (lang) => lang.id !== currId,
        );
        return {
          ...prevInfo,
          languages: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "add" ? "Add Languages" : "Edit Languages"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full flex-col gap-5"
      >
        <InputField id="lang" label="Language">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "language")}
            value={language}
            name="language"
            props={{
              placeholder: "Ex.English, Arbic, ...",
              type: "text",
              id: "lang",
            }}
          />
        </InputField>

        <InputField id="level" label="Language level">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "level")}
            value={level}
            name="level"
            props={{
              placeholder: "Ex. Beginner, Intermediate, Expert",
              type: "text",
              id: "level",
            }}
          />
        </InputField>
        <ResumeFormButtons
          mode={mode}
          handleDelete={(e) => handleDelete(e)}
          handleCancel={() => {
            setResumeInfo((prevInfo) => {
              const updatedArray = prevInfo.languages.filter(
                (lang) => lang.id !== 303030,
              );
              return {
                ...prevInfo,
                languages: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeLanguagesForm;
