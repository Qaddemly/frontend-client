import AuthInput from "../auth/AuthInput";
import AuthInputField from "../auth/AuthInputField";
import AuthButton from "../auth/AuthButton";
import { Languages } from "../auth";
import { useState } from "react";
import AuthSelect from "../auth/AuthSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { IError } from "../../interfaces/Auth.interfaces";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "../../services/profileApi";
import Loader from "../common/Loader";
import { createFormData } from "../../utils/helpers";

function MySkills() {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [language, setLanguage] = useState<Languages | "">("");
  const languageValues = Object.values(Languages);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  function handleAddSkillsClick() {
    if (skill.length) {
      setSkills((skills) =>
        skills.find((s) => s === skill) ? [...skills] : [...skills, skill],
      );
      setSkill("");
    }
  }

  function handleAddLanguagesClick() {
    if (language.length)
      setLanguages((langs) =>
        langs.find((s) => s === language)
          ? [...langs]
          : [...langs, language as Languages],
      );
  }

  async function handleSubmit() {
    const formData = createFormData({ skills, languages });
    if (Object.entries(formData).length)
      try {
        const res = await updateProfile(formData).unwrap();
        console.log(res);
        toast.success("Profile Updated");
        setSkill("");
        setLanguage("");
      } catch (err) {
        const error = err as IError;
        toast.error(error.data.message);
      }
  }
  return (
    <div className="w-[40rem] px-10">
      {isLoading && <Loader />}
      <div className="mt-10">
        <AuthInputField id="softSkills" label="Your skills">
          <AuthInput
            props={{
              type: "text",
              id: "softSkills",
              placeholder: "Ex. creative, problem solver,...",
              value: skill,
            }}
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
          />
        </AuthInputField>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
          >
            <p>{skill}</p>
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer text-xl"
              onClick={() =>
                setSkills((skills) => skills.filter((s) => s !== skill))
              }
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <AuthButton
          type="button"
          className="mt-5 w-fit px-2"
          onClick={handleAddSkillsClick}
        >
          Add New Skill
        </AuthButton>
      </div>

      <div className="mb-10 mt-5">
        <AuthSelect
          label="Your languages"
          id="languages"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Languages)}
        >
          {languageValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </AuthSelect>
        <div className="mt-4 flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
            >
              <p>{lang}</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-xl"
                onClick={() =>
                  setLanguages((langs) => langs.filter((s) => s !== lang))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <AuthButton
          type="button"
          className="w-fit px-2"
          onClick={handleAddLanguagesClick}
        >
          Add New Language
        </AuthButton>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <AuthButton onClick={handleSubmit} className="px-3">
          Save Changes
        </AuthButton>
      </div>
    </div>
  );
}

export default MySkills;
