import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import StartToEndDate from "../common/StartToEndDate";
import Button from "../common/Button";

interface IUpdateProjectsInputs {
  name: string;
  description: string;
  website: string;
  startDate: string;
  endDate: string;
}
function Projects() {
  const methods = useForm<IUpdateProjectsInputs>();
  const { register, handleSubmit } = methods;

  const submitForm: SubmitHandler<IUpdateProjectsInputs> = async (data) => {
    console.log(data);
  };

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
  return (
    <FormProvider {...methods}>
      <form
        className="mt-10 flex w-[35rem] flex-col gap-5 px-10"
        onSubmit={handleSubmit(submitForm)}
      >
        <InputField id="projectName" label="Project name">
          <Input
            register={register}
            name="name"
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
      </form>
    </FormProvider>
  );
}

export default Projects;
