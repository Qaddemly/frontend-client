import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface SkillsFormData {
  skills: string[];
  languages: string[];
  newSkill: string;
  newLanguage: string;
}

function ApplicationSkills({
  nextStep,
  // prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<SkillsFormData>(); // register
  const { setApplicationData } = useApplication();
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const skills = watch("skills") || [];
  const languages = watch("languages") || [];

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setValue("skills", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setValue("skills", newSkills);
  };

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      const newLanguages = [...languages, languageInput.trim()];
      setValue("languages", newLanguages);
      setLanguageInput("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    const newLanguages = languages.filter((lang) => lang !== languageToRemove);
    setValue("languages", newLanguages);
  };

  const onSubmit = (data: SkillsFormData) => {
    setApplicationData((prev) => ({
      ...prev,
      skills: data.skills || [],
      languages: data.languages || [],
    }));
    nextStep();
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-center text-3xl font-bold">Skills & Languages</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Skills</h3>
          <div className="flex items-center gap-3">
            <InputField
              errors={errors}
              id="customSkills"
              props={{ className: "w-full" }}
            >
              <Input
                register={register}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                props={{
                  type: "text",
                  id: "customSkills",
                  placeholder: "Skills",
                }}
              />
            </InputField>
            <Button onClick={addSkill} className="h-fit w-fit px-3">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
              >
                <p>{skill}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                  onClick={() => removeSkill(skill)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Languages</h3>
          <div className="flex items-center gap-3">
            <InputField
              errors={errors}
              id="customLanguages"
              props={{ className: "w-full" }}
            >
              <Input
                register={register}
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                props={{
                  type: "text",
                  id: "customLanguages",
                  placeholder: "Languages",
                }}
              />
            </InputField>
            <Button onClick={addLanguage} className="h-fit w-fit px-3">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((Language) => (
              <div
                key={Language}
                className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
              >
                <p>{Language}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl"
                  onClick={() => removeLanguage(Language)}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ApplicationSkills;
