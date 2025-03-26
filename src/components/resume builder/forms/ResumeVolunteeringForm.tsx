import { useResumeBuilder } from "../../../context/ResumeBuilderContext.tsx";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormMode,
  IOrganizationsInputs,
} from "../../../interfaces/ResumeBuilder.interfaces.ts";
import {
  useAddResumeOrganizationMutation,
  useDeleteResumeOrganizationMutation,
  useGetAllResumeOrganizationQuery,
  useUpdateResumeOrganizationMutation,
} from "../../../services/resumeBuilderApi.ts";
import { useState } from "react";
import { handleApiError, handleResumeAction } from "../../../utils/helpers.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import FormPreviewSection from "./FormPreviewSection.tsx";
import InputField from "../../common/InputField.tsx";
import Input from "../../common/Input.tsx";
import StartToEndDate from "../../common/StartToEndDate.tsx";
import RichTextEditor from "../../common/RichTextEditor.tsx";
import ResumeFormButtons from "../ResumeFormButtons.tsx";

function ResumeOrganizationForm({ mode }: { mode: FormMode }) {
  const { setStatus, resumeInfo, setResumeInfo, currId } = useResumeBuilder();
  const { resumeId } = useParams();
  const { register, handleSubmit } = useForm<IOrganizationsInputs>();
  const indexOfCurrOrganization = resumeInfo?.volunteering?.findIndex(
    (org) => org?.id === currId,
  );

  const { refetch } = useGetAllResumeOrganizationQuery({
    resumeId: resumeId || "",
  });
  const [addResumeOrganization] = useAddResumeOrganizationMutation();
  const [updateResumeOrganization] = useUpdateResumeOrganizationMutation();
  const [deleteResumeOrganization] = useDeleteResumeOrganizationMutation();

  const [organization, setOrganization] = useState(
    mode === "edit" &&
      resumeInfo?.volunteering?.[indexOfCurrOrganization]?.organization
      ? resumeInfo.volunteering[indexOfCurrOrganization].organization
      : "",
  );
  const [position, setPosition] = useState(
    mode === "edit" &&
      resumeInfo?.volunteering?.[indexOfCurrOrganization]?.position
      ? resumeInfo.volunteering[indexOfCurrOrganization].position
      : "",
  );

  const [country, setCountry] = useState(
    mode === "edit" &&
      resumeInfo?.volunteering?.[indexOfCurrOrganization]?.country
      ? resumeInfo.volunteering[indexOfCurrOrganization].country
      : "",
  );
  const [city, setCity] = useState(
    mode === "edit" && resumeInfo?.volunteering?.[indexOfCurrOrganization]?.city
      ? resumeInfo.volunteering[indexOfCurrOrganization].city
      : "",
  );
  const [startDate, setStartDate] = useState(
    mode === "edit" &&
      resumeInfo?.volunteering?.[indexOfCurrOrganization]?.start_date
      ? resumeInfo.volunteering[indexOfCurrOrganization].start_date
      : "",
  );
  const [endDate, setEndDate] = useState(
    mode === "edit" &&
      resumeInfo?.volunteering?.[indexOfCurrOrganization]?.end_date
      ? resumeInfo.volunteering[indexOfCurrOrganization].end_date
      : "",
  );
  const [description, setDescription] = useState(
    mode === "edit" &&
      resumeInfo?.volunteering?.[indexOfCurrOrganization]?.description
      ? resumeInfo.volunteering[indexOfCurrOrganization].description
      : "",
  );
  //   const [showLink, setShowLink] = useState(false);

  const submitForm: SubmitHandler<IOrganizationsInputs> = async (data) => {
    const organizationData = {
      organization: organization,
      position: position,
      start_date: startDate,
      end_date: endDate,
      description: description,
      is_current: false,
      country: country,
      city: city,
      resume_template_id: data.resume_template_id,
    };

    try {
      if (mode === "add") {
        await handleResumeAction(
          () =>
            addResumeOrganization({
              data: organizationData,
              resumeId: resumeId || "",
            }).unwrap(),
          mode,
        );
        refetch();
        setStatus(["normal"]);
      } else {
        await handleResumeAction(
          () =>
            updateResumeOrganization({
              data: organizationData,
              resumeId: resumeId || "",
              organizationId: currId.toString() || "",
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
    switch (field) {
      case "organization":
        setOrganization(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "start_date":
        setStartDate(value);
        break;
      case "end_date":
        setEndDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;

      default:
        break;
    }

    setResumeInfo((prevInfo) => {
      const updatedArray = [...prevInfo.volunteering];

      if (mode === "add") {
        const existingOrg = updatedArray.find((org) => org.id === 303030);
        if (existingOrg) {
          updatedArray[resumeInfo?.volunteering?.length - 1] = {
            ...updatedArray[resumeInfo?.volunteering?.length - 1],
            [field]: value,
          };
        } else {
          const newOrganization = {
            id: 303030,
            organization: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
            country: "",
            city: "",
            resume_template_id: 0,
          } as IOrganizationsInputs;
          newOrganization[field] = value;
          updatedArray.push(newOrganization);
        }
      } else if (mode === "edit") {
        if (updatedArray[indexOfCurrOrganization]) {
          updatedArray[indexOfCurrOrganization] = {
            ...updatedArray[indexOfCurrOrganization],
            [field]: value,
          };
        }
      }
      return {
        ...prevInfo,
        volunteering: updatedArray,
      };
    });
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await handleResumeAction(
        () =>
          deleteResumeOrganization({
            resumeId: resumeId || "",
            organizationId: currId.toString() || "",
          }).unwrap(),
        "delete",
      );
      setStatus(["normal"]);
      setResumeInfo((prevInfo) => {
        const updatedArray = prevInfo.volunteering.filter(
          (pro) => pro.id !== currId,
        );
        return {
          ...prevInfo,
          volunteering: updatedArray,
        };
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <FormPreviewSection
      title={mode === "add" ? "Add Organization" : "Edit Organization"}
      tips={true}
      autoFill={true}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex w-full flex-col gap-5"
      >
        <InputField id="organization" label="Organization">
          <Input
            register={register}
            onChange={(e) => handleOnChange(e, "organization")}
            value={organization}
            name="organization"
            props={{
              placeholder: "Enter organization",
              type: "text",
              id: "organization",
            }}
          />
        </InputField>
        <InputField id="position" label="Position">
          <div className="mb-5 flex items-center gap-3">
            <Input
              register={register}
              onChange={(e) => handleOnChange(e, "position")}
              value={position}
              name="position"
              props={{
                placeholder: "Enter position",
                type: "text",
                id: "position",
              }}
            />
            {/* <Button
              type="button"
              className="flex items-center gap-1 border-2 border-gray-200 bg-white px-3 text-gray-300 hover:bg-white"
              onClick={() => setShowLink(true)}
            >
              <FontAwesomeIcon icon={faLink} />
              <span>Link</span>
            </Button> */}
          </div>
        </InputField>

        {/* {showLink && (
          <InputWithLink
            register={register}
            value={projectLink}
            handleOnChange={(e) => handleOnChange(e, "project_link")}
            setShowLink={setShowLink}
            setValue={setProjectLink}
            name="project_link"
            id="project_link"
          />
        )} */}
        <div className="flex gap-5">
          <InputField id="country" label="Country">
            <Input
              onChange={(e) => handleOnChange(e, "country")}
              value={country}
              name="country"
              props={{
                placeholder: "Ex. Egypt",
                type: "text",
                id: "country",
              }}
            />
          </InputField>
          <InputField id="city" label="City">
            <Input
              onChange={(e) => handleOnChange(e, "city")}
              value={city}
              name="city"
              props={{
                placeholder: "Ex. Cairo",
                type: "text",
                id: "city",
              }}
            />
          </InputField>
        </div>
        <StartToEndDate
          startDate="start_date"
          startDateDefaultValue={startDate?.toString()}
          onChangeStartDate={(e) => handleOnChange(e, "start_date")}
          endDate="end_date"
          onChangeEndDate={(e) => handleOnChange(e, "end_date")}
          endDateDefaultValue={endDate?.toString()}
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
              const updatedArray = prevInfo.projects.filter(
                (pro) => pro.id !== 303030,
              );
              return {
                ...prevInfo,
                projects: updatedArray,
              };
            });
          }}
        />
      </form>
    </FormPreviewSection>
  );
}

export default ResumeOrganizationForm;
