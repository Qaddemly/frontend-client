import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FormMode,
  IResumeInfo,
  IResumeTemplate,
  ResumeStatus,
} from "../interfaces/ResumeBuilder.interfaces.ts";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import {
  useGetAllResumeEducationQuery,
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
  handleOnChange: (
    index: number,
    propertyName: keyof IResumeInfo,
    e: React.ChangeEvent<HTMLInputElement>,
    mode: FormMode,
  ) => void;
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

  useEffect(() => {
    setResumeTemplates(resumeTemplatesData ?? []);

    if (!resumePersonal || !resumeEducation) {
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
        aboutMe: "",
      },
      education: resumeEducation?.educationsContent
        ? resumeEducation.educationsContent.map((edu) => ({
            id: edu.id ?? 0,
            degree: edu.degree ?? "",
            school: edu.school ?? "",
            country: edu.country ?? "",
            city: edu.city ?? "",
            startDate: edu.start_date ?? "",
            endDate: edu.end_date ?? "",
            description: edu.description ?? "",
          }))
        : [],
    }));
  }, [
    isLoading,
    isSuccess,
    resumeEducation,
    resumePersonal,
    resumeTemplatesData,
    setResumeTemplates,
    setResumeInfo,
  ]);

  function handleOnChange<T extends keyof IResumeInfo>(
    index: number,
    propertyName: T,
    e: React.ChangeEvent<HTMLInputElement>,
    mode: FormMode,
  ) {
    const { name, value } = e.target;

    setResumeInfo((prevInfo) => {
      const array = prevInfo[propertyName];

      if (!Array.isArray(array)) {
        return prevInfo;
      }

      let updatedArray = [...array];

      if (mode === "add") {
        if (index >= updatedArray.length) {
          updatedArray = [
            ...updatedArray,
            { [name]: value } as (typeof updatedArray)[number],
          ];
        } else {
          updatedArray[index] = {
            ...updatedArray[index],
            [name]: value,
          };
        }
      } else if (mode === "edit") {
        if (updatedArray[index]) {
          updatedArray[index] = {
            ...updatedArray[index],
            [name]: value,
          };
        }
      }

      return {
        ...prevInfo,
        [propertyName]: updatedArray,
      };
    });
  }

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
        handleOnChange,
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
