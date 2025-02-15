import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { IProject } from "../../interfaces/Profile.interfaces";
import { useParams } from "react-router-dom";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../../services/profileApi";
import { createFormData, handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

// interface IUpdateProjectsInputs {
//   name: string;
//   description: string;
//   website: string;
//   startDate: string;
//   endDate: string;
// }
function Projects() {
  const methods = useForm<IProject>();
  const { register, handleSubmit } = methods;
  const { proId } = useParams();

  const [project, setProject] = useState<FileList | null>(null);
  const [data, { isLoading: isLoading1 }] = useAddProjectMutation();
  const [updateProject, { isLoading: isLoading2 }] = useUpdateProjectMutation();

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  function handleAddSkillsClick() {
    if (skill.length) {
      setSkills((skills) =>
        skills.find((s) => s === skill) ? [...skills] : [...skills, skill],
      );
      setSkill("");
    }
  }
  async function handleAddProject() {
    if (project) {
      const formData = createFormData({ projects: project });
      try {
        await data({ projects: formData }).unwrap();
        toast.success("project added successfully");
        setProject(null);
      } catch (error) {
        handleApiError(error);
      }
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  const submitForm: SubmitHandler<IProject> = async (data) => {
    try {
      await updateProject({ id: proId || "" }).unwrap();
      toast.success("Project updated successfully");
    } catch (error) {
      handleApiError(error);
    }
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      {project && (
        <form
          className="mt-10 flex w-[35rem] flex-col gap-5 px-10"
          onSubmit={handleSubmit(submitForm)}
        >
          <InputField id="projectName" label="Project name">
            <Input
              register={register}
              name={methods.getValues.name.toString()}
              props={{
                placeholder: "E-commerce",
                type: "text",
                id: "projectName",
              }}
            />
          </InputField>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              {...register("description")}
              className={`min-h-28 rounded-md border-2 border-gray-200 p-5 outline-none`}
              placeholder="Ex: I raised funds for our annul charity 5K."
            />
          </div>

          <InputField id="softSkills" label="Your skills">
            <Input
              props={{
                type: "text",
                id: "softSkills",
                placeholder: "Ex. creative, problem solver,...",
                value: skill,
              }}
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
            />
          </InputField>

          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
              >
                <p>{skill}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                  onClick={async () => {
                    setSkills((skills) => skills.filter((s) => s !== skill));
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              className="mt-5 w-fit px-2"
              onClick={handleAddSkillsClick}
            >
              Add New Skill
            </Button>
          </div>

          <StartToEndDate
            startDate="startDate"
            endDate="endDate"
            register={register}
            //   startDateDefaultValue={currentExperience?.start_date || ""}
            //   endDateDefaultValue={currentExperience?.end_date || ""}
          />

          <div className="mt-5 flex w-full justify-end">
            <Button className="px-3">Save Changes</Button>
          </div>
          <div className="mt-5 flex w-full justify-end">
            {project && (
              <Button className="px-3" onClick={handleAddProject}>
                Add
              </Button>
            )}
          </div>
        </form>
      )}
    </FormProvider>
  );
}

export default Projects;
