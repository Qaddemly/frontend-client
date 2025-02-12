import Input from "../common/Input";
import { Languages } from "../../enums/index.enums";
import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Select from "../common/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  useAddNewLanguageMutation,
  useAddNewSkillMutation,
  useDeleteLanguageMutation,
  useDeleteSkillMutation,
  useGetUserQuery,
} from "../../services/profileApi";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function MySkills() {
  const userSkills = useSelector(
    (state: RootState) => state.user?.user?.skills,
  );
  const userLanguages = useSelector(
    (state: RootState) => state.user?.user?.languages,
  );
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [language, setLanguage] = useState<Languages | "">("");
  const languageValues = Object.values(Languages);

  const [addNewSkill, { isLoading: isLoading1 }] = useAddNewSkillMutation();
  const [addNewLanguage, { isLoading: isLoading2 }] =
    useAddNewLanguageMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [deleteLanguage] = useDeleteLanguageMutation();
  const { refetch } = useGetUserQuery();

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
    try {
      if (skills.length) {
        await addNewSkill({ skills }).unwrap();
        toast.success("Profile updated");
        refetch();
        setSkill("");
        setSkills([]);
      }
      if (languages.length) {
        await addNewLanguage({ languages }).unwrap();
        toast.success("Profile updated");
        refetch();
        setLanguage("");
        setLanguages([]);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="w-[40rem] px-10">
      {/* {isLoading && <Loader />} */}
      <div className="mt-10">
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
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills?.map((skill, i) => (
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
        {userSkills?.map((skill) => (
          <div
            key={skill.id}
            className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
          >
            <p>{skill.name}</p>
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer text-xl"
              onClick={async () => {
                setSkills((skills) => skills.filter((s) => s !== skill.name));
                await deleteSkill({ skillsId: [skill.id] });
                refetch();
                toast.success("Skill deleted successfully");
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

      <div className="mb-10 mt-5">
        <Select
          label="Your languages"
          id="languages"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Languages)}
        >
          {languageValues?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <div className="mt-4 flex flex-wrap gap-2">
          {languages?.map((lang, i) => (
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
          {userLanguages?.map((lang) => (
            <div
              key={lang.id}
              className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
            >
              <p>{lang.name}</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-xl"
                onClick={async () => {
                  await deleteLanguage({ languagesId: [lang.id] });
                  setLanguages((langs) => langs.filter((s) => s !== lang.name));
                  refetch();
                  toast.success("Language deleted successfully");
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          className="w-fit px-2"
          onClick={handleAddLanguagesClick}
        >
          Add New Language
        </Button>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Button onClick={handleSubmit} className="px-3">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default MySkills;
