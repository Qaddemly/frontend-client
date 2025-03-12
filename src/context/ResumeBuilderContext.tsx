import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IResumeInfo,
  IResumeTemplate,
  ResumeStatus,
} from "../interfaces/ResumeBuilder.interfaces.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useGetAllResumeEducationQuery,
  useGetAllResumeSkillsQuery,
  useGetAllResumeTemplatesQuery,
  useGetResumePersonalQuery,
} from "../services/resumeBuilderApi.ts";
import { useParams } from "react-router-dom";

export interface ResumeBuilderContextProps {
  resumeTemplates: IResumeTemplate[];
  setResumeTemplates: React.Dispatch<React.SetStateAction<IResumeTemplate[]>>;
  resumeInfo: IResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<IResumeInfo>>;
  showAddContent: boolean;
  setShowAddContent: React.Dispatch<React.SetStateAction<boolean>>;
  status: ResumeStatus[];
  setStatus: React.Dispatch<React.SetStateAction<ResumeStatus[]>>;
  currId: number;
  setCurrId: React.Dispatch<React.SetStateAction<number>>;
  handleOnChangeTextEditor: (
    index: number,
    propertyName: keyof IResumeInfo,
    e: ContentEditableEvent,
  ) => void;
}

const ResumeBuilderContext = createContext<
  ResumeBuilderContextProps | undefined
>(undefined);

export const ResumeBuilderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { resumeId } = useParams();
  ///////////////////////////////////////////// Resume Template //////////////////////////////////////////////
  const [resumeTemplates, setResumeTemplates] = useState<IResumeTemplate[]>([]);
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo>({} as IResumeInfo);
  const [showAddContent, setShowAddContent] = useState(false);
  const [status, setStatus] = useState<ResumeStatus[]>(
    JSON.parse(localStorage.getItem("resumeStatus") || '["start"]'),
  );
  useEffect(() => {
    if (localStorage.getItem("resumeStatus")?.includes("edit")) {
      setStatus(["normal"]);
    }
  }, []);
  localStorage.setItem("resumeStatus", JSON.stringify(status));
  const [currId, setCurrId] = useState(0);
  const { data } = useGetAllResumeTemplatesQuery();
  const resumeTemplatesData = data?.data;

  ///////////////////////////////////////////// Personal //////////////////////////////////////////////
  const { data: resumePersonal } = useGetResumePersonalQuery({
    resumeId: resumeId || "",
  });

  ///////////////////////////////////////////// Education //////////////////////////////////////////////
  const {
    data: resumeEducation,
    isLoading,
    isSuccess,
  } = useGetAllResumeEducationQuery({
    resumeId: resumeId || "",
  });
  ///////////////////////////////////////////// Skills //////////////////////////////////////////////
  const { data: resumeSkills } = useGetAllResumeSkillsQuery({
    resumeId: resumeId || "",
  });

  useEffect(() => {
    setResumeTemplates(resumeTemplatesData ?? []);
    if (!resumePersonal || !resumeEducation || !resumeTemplates) {
      return;
    }

    setResumeInfo((prevState) => ({
      ...prevState,
      personal: {
        id: resumePersonal?.personaInfoContent?.id ?? 0,
        fullName: resumePersonal?.personaInfoContent?.full_name ?? "",
        jobTitle: resumePersonal?.personaInfoContent?.job_title ?? "",
        email: resumePersonal?.personaInfoContent?.email ?? "",
        phone: resumePersonal?.personaInfoContent?.phone_number ?? "",
        address: resumePersonal?.personaInfoContent?.address ?? "",
        aboutMe:
          resumeTemplates.find(
            (template) => template.id.toString() === resumeId,
          )?.profile ?? "",
      },
      education: resumeEducation?.educationsContent
        ? resumeEducation.educationsContent.map((edu) => ({
            id: edu.id ?? 0,
            degree: edu.degree ?? "",
            school: edu.school ?? "",
            country: edu.country ?? "",
            city: edu.city ?? "",
            start_year: 0,
            end_year: 0,
            start_month: 0,
            end_month: 0,
            start_date: edu.start_date ?? "",
            end_date: edu.end_date ?? "",
            description: edu.description ?? "",
            school_link: "",
            is_current: false,
          }))
        : [],
      skills: resumeSkills?.skillsContent
        ? resumeSkills.skillsContent.map((skill) => ({
            id: skill.id ?? 0,
            name: skill.name ?? "",
            information: skill.information ?? "",
            level: skill.level ?? "",
          }))
        : [],
    }));
  }, [
    isLoading,
    isSuccess,
    resumeEducation,
    resumePersonal,
    resumeSkills,
    resumeTemplatesData,
    currId,
    setCurrId,
    setResumeTemplates,
    setResumeInfo,
  ]);

  function handleOnChangeTextEditor(
    index: number,
    propertyName: keyof IResumeInfo,
    e: ContentEditableEvent,
  ) {
    const { value } = e.target;

    setResumeInfo((prevInfo) => {
      const array = prevInfo[propertyName];

      if (Array.isArray(array)) {
        return {
          ...prevInfo,
          [propertyName]: array.map((item, i) =>
            i === index ? { ...item, description: value } : item,
          ),
        };
      }

      return prevInfo;
    });
  }

  return (
    <ResumeBuilderContext.Provider
      value={{
        resumeTemplates,
        setResumeTemplates,
        showAddContent,
        setShowAddContent,
        resumeInfo,
        setResumeInfo,
        status,
        setStatus,
        setCurrId,
        currId,

        handleOnChangeTextEditor,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumeBuilder = (): ResumeBuilderContextProps => {
  const context = useContext(ResumeBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useResumeBuilder must be used within a ResumeBuilderProvider",
    );
  }
  return context;
};
