import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IGetResumePersonalInfoResponse,
  IResumeInfo,
  IResumeTemplate,
  ResumeStatus,
} from "../interfaces/ResumeBuilder.interfaces.ts";
import {
  useGetAllResumeAwardsQuery,
  useGetAllResumePublicationsQuery,
  useGetAllResumeCertificatesQuery,
  useGetAllResumeCustomQuery,
  useGetAllResumeEducationQuery,
  useGetAllResumeExperienceQuery,
  useGetAllResumeInterestsQuery,
  useGetAllResumeLanguageQuery,
  useGetAllResumeReferenceQuery,
  useGetAllResumeProjectsQuery,
  useGetAllResumeSkillsQuery,
  useGetAllResumeTemplatesQuery,
  useGetResumePersonalQuery,
  useGetAllResumeOrganizationQuery,
} from "../services/resumeBuilderApi.ts";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

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
  const { data: resumePersonalData, isError } = useGetResumePersonalQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  const [resumePersonal, setResumePersonal] = useState<
    IGetResumePersonalInfoResponse | undefined
  >(undefined);

  useEffect(() => {
    if (isError) {
      setResumePersonal({
        success: false,
        personaInfoContent: {
          id: 0,
          full_name: "",
          job_title: "",
          email: "",
          phone_number: "",
          address: "",
          personal_information: {
            date_of_birth: "",
            gender: "",
            id: "",
            nationality: "",
          },
          picture: "",
          links: {
            gitHub: "",
            faceBook: "",
            website: "",
          },
          created_at: "",
          updated_at: "",
          resumeTemplate: {} as IResumeTemplate,
        },
      });
    } else {
      setResumePersonal(resumePersonalData);
    }
  }, [isError, resumePersonalData]);
  ///////////////////////////////////////////// Education //////////////////////////////////////////////
  const {
    data: resumeEducation,
    isLoading,
    isSuccess,
  } = useGetAllResumeEducationQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Experience //////////////////////////////////////////////
  const { data: resumeExperience } = useGetAllResumeExperienceQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Skills //////////////////////////////////////////////
  const { data: resumeSkills } = useGetAllResumeSkillsQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Certificates //////////////////////////////////////////////
  const { data: resumeCertificates } = useGetAllResumeCertificatesQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Projects //////////////////////////////////////////////
  const { data: resumeProjects } = useGetAllResumeProjectsQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Custom //////////////////////////////////////////////
  const { data: resumeCustoms } = useGetAllResumeCustomQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Awards //////////////////////////////////////////////
  const { data: resumeAwards } = useGetAllResumeAwardsQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Publications //////////////////////////////////////////////
  const { data: resumePublications } = useGetAllResumePublicationsQuery(
    resumeId && !status.includes("addResume") ? { resumeId } : skipToken,
  );
  ///////////////////////////////////////////// Languages //////////////////////////////////////////////
  const { data: resumeLanguages } = useGetAllResumeLanguageQuery({
    resumeId: resumeId || "",
  });
  ///////////////////////////////////////////// Interests //////////////////////////////////////////////
  const { data: resumeInterests } = useGetAllResumeInterestsQuery({
    resumeId: resumeId || "",
  });
  ///////////////////////////////////////////// Reference //////////////////////////////////////////////
  const { data: resumeReference } = useGetAllResumeReferenceQuery({
    resumeId: resumeId || "",
  });
  ///////////////////////////////////////////// Reference //////////////////////////////////////////////
  const { data: resumeOrganization } = useGetAllResumeOrganizationQuery({
    resumeId: resumeId || "",
  });

  useEffect(() => {
    setResumeTemplates(resumeTemplatesData ?? []);
    if (!resumePersonal || !resumeEducation || !resumeTemplates) {
      return;
    }

    setResumeInfo((prevState) => {
      return {
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
        experience: resumeExperience?.data
          ? resumeExperience.data.map((experience) => ({
              id: experience.id ?? 0,
              job_title: experience.job_title ?? "",
              company_name: experience.company_name ?? "",
              city: experience.city ?? "",
              country: experience.country ?? "",
              start_date: experience.start_date ?? "",
              end_date: experience.end_date ?? "",
              description: experience.description ?? "",
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
        certificates: resumeCertificates?.certificatesContent
          ? resumeCertificates.certificatesContent.map((certificate) => ({
              id: certificate.id ?? 0,
              certificate: certificate.certificate ?? "",
              certificate_url: certificate.certificate_url ?? "",
              additional_information: certificate.additional_information ?? "",
            }))
          : [],
        projects: resumeProjects?.projectsContent
          ? resumeProjects.projectsContent.map((project) => ({
              id: project.id ?? 0,
              title: project.title ?? "",
              subtitle: project.subtitle ?? "",
              project_link: project.project_link ?? "",
              start_date: project.start_date ?? "",
              end_date: project.end_date ?? "",
              description: project.description ?? "",
              is_current: false,
            }))
          : [],
        custom: resumeCustoms?.data
          ? resumeCustoms.data.map((custom) => ({
              id: custom.id ?? 0,
              section_name: custom.section_name ?? "",
              title: custom.title ?? "",
              subtitle: custom.subtitle ?? "",
              city: custom.city ?? "",
              country: custom.country ?? "",
              start_date: custom.start_date ?? "",
              end_date: custom.end_date ?? "",
              description: custom.description ?? "",
              is_current: false,
            }))
          : [],
        awards: resumeAwards?.awardsContent
          ? resumeAwards.awardsContent.map((award) => ({
              id: award.id ?? 0,
              award: award.award ?? "",
              award_url: award.award_url ?? "",
              issuer: award.issuer ?? "",
              date: award.date ?? "",
              description: award.description ?? "",
            }))
          : [],
        publications: resumePublications?.publicationsContent
          ? resumePublications.publicationsContent.map((publication) => ({
              id: publication.id ?? 0,
              title: publication.title ?? "",
              publication_url: publication.publication_url ?? "",
              publisher: publication.publisher ?? "",
              date: publication.date ?? "",
              description: publication.description ?? "",
            }))
          : [],
        languages: resumeLanguages?.languagesContent
          ? resumeLanguages.languagesContent.map((lang) => ({
              id: lang.id ?? 0,
              language: lang.language ?? "",
              additional_info: lang.additional_info ?? "",
              level: lang.level ?? "",
              resume_template_id: lang.resume_template_id ?? "",
            }))
          : [],
        hobbies: resumeInterests?.interestsContent
          ? resumeInterests.interestsContent.map((inter) => ({
              id: inter.id ?? 0,
              resume_template_id: inter.resume_template_id ?? "",
              interest: inter.interest ?? "",
              description: inter.description ?? "",
            }))
          : [],
        references: resumeReference?.referencesContent
          ? resumeReference.referencesContent.map((ref) => ({
              id: ref.id ?? 0,
              resume_template_id: ref.resume_template_id ?? "",
              name: ref.name ?? "",
              job_title: ref.job_title ?? "",
              organization: ref.organization ?? "",
              email: ref.email ?? "",
              phone: ref.phone ?? "",
            }))
          : [],
        volunteering: resumeOrganization?.organizationsContent
          ? resumeOrganization.organizationsContent.map((org) => ({
              id: org.id ?? 0,
              organization: org.organization ?? "",
              position: org.position ?? "",
              start_date: org.start_date ?? "",
              end_date: org.end_date ?? "",
              description: org.description ?? "",
              is_current: false,
              country: org.country ?? "",
              city: org.city ?? "",
              resume_template_id: org.resume_template_id ?? 0,
            }))
          : [],
      };
    });
  }, [
    isLoading,
    isSuccess,
    resumeTemplatesData,
    resumePersonal,
    resumeEducation,
    resumeExperience,
    resumeSkills,
    resumeCertificates,
    resumeLanguages,
    resumeInterests,
    resumeReference,
    resumeProjects,
    resumeCustoms,
    currId,
    setCurrId,
    setResumeTemplates,
    setResumeInfo,
    resumeAwards,
    resumePublications,
    resumeOrganization,
  ]);

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
