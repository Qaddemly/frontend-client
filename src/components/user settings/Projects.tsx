import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";
import { IProject } from "../../interfaces/Profile.interfaces";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../services/profileApi";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

type ProjectStatus = "update" | "create";

function Projects() {
  const { projectId } = useParams();
  const projectStatus: ProjectStatus = projectId === "0" ? "create" : "update";

  const navigate = useNavigate();

  const methods = useForm<IProject>();
  const { register, handleSubmit } = methods;

  const [addProject, { isLoading: isLoading1 }] = useAddProjectMutation();
  const [updateProject, { isLoading: isLoading2 }] = useUpdateProjectMutation();
  const { data, isLoading: isLoading3 } = useGetProjectQuery({
    id: projectId || "",
  });
  const project = data?.project;
  const { refetch: refetchProjects } = useGetAllProjectsQuery({});

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

  const submitForm: SubmitHandler<IProject> = async (data) => {
    console.log(data);
    if (projectStatus === "update") {
      try {
        await updateProject({
          id: projectId || "",
          data: { ...data, skills },
        }).unwrap();
        toast.success("Project updated successfully");
      } catch (error) {
        handleApiError(error);
      }
    } else {
      if (
        data.name &&
        data.description &&
        data.start_date &&
        data.end_date &&
        data.link
      )
        try {
          await addProject({ data: { ...data, skills } }).unwrap();
          toast.success("Project created successfully");
          navigate("/userSettings/profile/projects");
          refetchProjects();
        } catch (error) {
          handleApiError(error);
        }
    }
  };

  useEffect(() => {
    if (projectStatus === "update")
      methods.reset({
        name: project?.name || "",
        description: project?.description || "",
        skills: project?.skills || [],
        start_date: project?.start_date || "",
        end_date: project?.end_date || "",
        link: project?.link || "",
      });
  }, [project, methods, projectStatus]);

  if (isLoading1 || isLoading2 || isLoading3) return <Loader />;

  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[35rem] flex-col gap-5 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputField id="projectName" label="Project name">
          <Input
            register={register}
            name={"name"}
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
          {projectStatus === "update" &&
            project?.skills?.map((skill) => (
              <div
                key={skill}
                className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
              >
                <p>{skill}</p>
                {/* <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                  onClick={async () => {
                    setSkills((skills) => skills.filter((s) => s !== skill));
                  }}
                /> */}
              </div>
            ))}
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
          startDate="start_date"
          endDate="end_date"
          register={register}
        />

        <div className="my-5 flex items-center">
          <input
            {...register("still_working")}
            type="checkbox"
            id="stillWorking"
            defaultChecked={
              projectStatus === "update" ? project?.still_working : false
            }
            className="text-green-600 focus:ring-green-500 h-4 w-4 rounded border-gray-300"
          />

          <label htmlFor="still_working" className="ms-2 font-medium">
            I am currently working in this role
          </label>
        </div>

        <InputField id="link" label="Project Link">
          <Input
            register={register}
            name={"link"}
            props={{
              placeholder: "Enter project link",
              type: "text",
              id: "link",
            }}
          />
        </InputField>

        <div className="mt-5 flex w-full justify-end">
          <Button className="px-3">Save Changes</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Projects;
