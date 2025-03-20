import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";
import {
  FormMode,
  IAwardsInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  useAddResumeAwardMutation,
  useDeleteResumeAwardMutation,
  useGetAllResumeAwardsQuery,
  useUpdateResumeAwardMutation,
} from "../../../services/resumeBuilderApi.ts";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import Button from "../../common/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import InputWithLink from "../../common/InputWithLink.tsx";
import DatePicker from "../../common/DatePicker.tsx";

function ResumeAwardsForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<IAwardsInputs>();
  const indexOfCurrAward = resumeInfo?.awards?.findIndex(
    (award) => award?.id === currId,
  );

  const { refetch } = useGetAllResumeAwardsQuery({
    resumeId: resumeId || "",
  });
  const [addResumeAward] = useAddResumeAwardMutation();
  const [updateResumeAward] = useUpdateResumeAwardMutation();
  const [deleteResumeAward] = useDeleteResumeAwardMutation();

  const [award, setAward] = useState(
    mode === "edit" && resumeInfo?.awards?.[indexOfCurrAward]?.award
      ? resumeInfo.awards[indexOfCurrAward].award
      : "",
  );
  const [awardUrl, setAwardUrl] = useState(
    mode === "edit" && resumeInfo?.awards?.[indexOfCurrAward]?.award_url
      ? resumeInfo.awards[indexOfCurrAward].award_url
      : "",
  );
  const [issuer, setIssuer] = useState(
    mode === "edit" && resumeInfo?.awards?.[indexOfCurrAward]?.issuer
      ? resumeInfo.awards[indexOfCurrAward].issuer
      : "",
  );
  const [date, setDate] = useState(
    mode === "edit" && resumeInfo?.awards?.[indexOfCurrAward]?.date
      ? resumeInfo.awards[indexOfCurrAward].date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" && resumeInfo?.awards?.[indexOfCurrAward]?.description
      ? resumeInfo.awards[indexOfCurrAward].description
      : "",
  );
  const [showLink, setShowLink] = useState(false);

  const submitForm: SubmitHandler<IAwardsInputs> = async () => {
    const awardsData = {
      award: award,
      award_url: awardUrl,
      issuer: issuer,
      date: date,
      description: description,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeAward({
              data: awardsData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeAward({
              data: awardsData,
              resumeId: resumeId || "",
              awardId: currId.toString() || "",
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
    if (field === "award") setAward(value);
    else if (field === "description") setDescription(value);
    else if (field === "award_url") setAwardUrl(value);
    else if (field === "issuer") setIssuer(value);
    else if (field === "date") setDate(value);

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.awards];
      if (mode === "add") {
        const existingSkill = updatedArray.find((award) => award.id === 303030);
        if (existingSkill) {
          updatedArray[resumeInfo?.awards?.length - 1] = {
            ...updatedArray[resumeInfo?.awards?.length - 1],
            [field]: value,
          };
        } else {
          const newAwards = {
            id: 303030,
            award: "",
            award_url: "",
            issuer: "",
            date: "",
            description: "",
          } as IAwardsInputs;
          newAwards[field] = value;
          updatedArray.push(newAwards);
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrAward]) {
          updatedArray[indexOfCurrAward] = {
            ...updatedArray[indexOfCurrAward],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        awards: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeAward({
            resumeId: resumeId || "",
            awardId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.awards.filter(
          (award) => award.id !== currId,
        );
        return {
          ...prevInfo,
          awards: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={
        mode === "add"
          ? "Add Achievements / Awards"
          : "Edit Achievements / Awards"
      }
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex w-full flex-col"
      >
        <InputField id="award" label="Achievement / Award">
          <div className="mb-5 flex items-center gap-3">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "award")}
              value={award}
              options={{ required: "Award name is required" }}
              name="award"
              props={{
                placeholder: "Enter Achievement / Award",
                type: "text",
                id: "award",
              }}
            />
            <Button
              type="button"
              className="flex items-center gap-1 border-2 border-gray-200 bg-white px-3 text-gray-300 hover:bg-white"
              onClick={() => setShowLink(true)}
            >
              <FontAwesomeIcon icon={faLink} />
              <span>Link</span>
            </Button>
          </div>
        </InputField>

        {showLink && (
          <InputWithLink
            register={register}
            value={awardUrl}
            handleOnChange={(e) => handleOnChange(e, "award_url")}
            setShowLink={setShowLink}
            setValue={setAwardUrl}
            name="awardUrl"
            id="awardUrl"
          />
        )}

        <InputField id="issuer" label="Issuer">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "issuer")}
            value={issuer}
            name="issuer"
            props={{
              placeholder: "Enter Issuer",
              type: "text",
              id: "issuer",
            }}
          />
        </InputField>

        <DatePicker
          onChange={(e) => handleOnChange(e, "date")}
          name="date" // TODO solve error
          register={register}
        />
        <RichTextEditor
          label="Description"
          value={description}
          onChange={(e) => handleOnChange(e, "description")}
        />

        <ResumeFormButtons
          mode={mode}
          handleDelete={(e) => handleDelete(e)}
          handleCancel={() => {
            setResumeInfo((prevInfo) => {
              const updatedArray = prevInfo.awards.filter(
                (award) => award.id !== 303030,
              );
              return {
                ...prevInfo,
                awards: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeAwardsForm;
