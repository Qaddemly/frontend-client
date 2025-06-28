import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import UserProfileSection from "./UserProfileSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBasicInfo } from "../../interfaces/Auth.interfaces.ts";
import {
  useGetAllCertificatesQuery,
  useGetAllProjectsQuery,
  useGetAllVolunteeringsQuery,
  useGetEducationQuery,
  useGetExperienceQuery,
} from "../../services/profileApi.ts";
import Loader from "../common/Loader.tsx";
import { formatDateByYearAndMonth } from "../../utils/helpers.ts";
import { useParams } from "react-router-dom";

function UserProfileBody({
  basicInfo,
  profileType,
}: {
  basicInfo: IBasicInfo;
  profileType: "me" | "others";
}) {
  const { userId } = useParams();
  const { data: projectsData, isLoading: loadingProjects } =
    useGetAllProjectsQuery({
      id: profileType === "others" ? userId : undefined,
    });
  const { data: voulunteeringData, isLoading: loadingVoulunteering } =
    useGetAllVolunteeringsQuery({
      id: profileType === "others" ? userId : undefined,
    });
  const { data: certificatesData, isLoading: loadingCertificates } =
    useGetAllCertificatesQuery({
      id: profileType === "others" ? userId : undefined,
    });
  const { data: experienceData, isLoading: loadingExperience } =
    useGetExperienceQuery({
      id: profileType === "others" ? userId : undefined,
    });
  const { data: educationData, isLoading: loadingEducation } =
    useGetEducationQuery({
      id: profileType === "others" ? userId : undefined,
    });

  return (
    <div className="border-r-2 border-[#eee] lg:w-[80rem] xl:w-[120rem]">
      {/* About me Section */}
      <div className="border-b-2 border-t-2 border-[#eee] px-10 py-10 sm:border-t-0 sm:px-20 md:px-10 lg:px-32">
        <p className="mb-5 text-xl font-semibold">About me</p>
        <p>{basicInfo?.about_me}</p>
      </div>

      {/* Education Section */}
      <div className="border-b-2 border-[#eee] px-10 py-10 sm:px-20 md:px-10 lg:px-32">
        <p className="mb-5 text-xl font-semibold">Education</p>
        {loadingEducation && <Loader forSection={true} />}
        {educationData?.educations?.map((education) => (
          <UserProfileSection
            key={education?.id}
            title={education?.field_of_study}
            startDate={formatDateByYearAndMonth(education?.start_date)}
            endDate={formatDateByYearAndMonth(education?.end_date)}
          >
            <p>{education?.university}</p>

            <p>Grade: {education?.gpa}</p>
          </UserProfileSection>
        ))}
      </div>

      {/* Experience Section */}
      <div className="border-b-2 border-[#eee] px-10 py-10 sm:px-20 md:px-10 lg:px-32">
        <p className="mb-5 text-xl font-semibold">Experience</p>
        {loadingExperience && <Loader forSection={true} />}
        {experienceData?.experiences?.map((experience) => (
          <UserProfileSection
            key={experience?.id}
            title={experience?.job_title}
            startDate={formatDateByYearAndMonth(experience?.start_date)}
            endDate={formatDateByYearAndMonth(experience?.end_date)}
          >
            <p>{experience?.company_name}</p>
            <p>Location : {experience?.location}</p>
          </UserProfileSection>
        ))}
      </div>

      {/* Project Section */}
      <div className="border-b-2 border-[#eee] px-10 py-10 sm:px-20 md:px-10 lg:px-32">
        <p className="mb-5 text-xl font-semibold">Projects</p>
        {loadingProjects && <Loader forSection={true} />}
        {projectsData?.projects?.map((project) => (
          <UserProfileSection
            key={project.id}
            title={project.name}
            startDate={formatDateByYearAndMonth(project.start_date)}
            endDate={formatDateByYearAndMonth(project.end_date)}
          >
            <p>{project.description}</p>
          </UserProfileSection>
        ))}
      </div>
      {/* Volunteering Section */}
      <div className="border-b-2 border-[#eee] px-10 py-10 sm:px-20 md:px-10 lg:px-32">
        <p className="mb-5 text-xl font-semibold">Volunteering</p>
        {loadingVoulunteering && <Loader forSection={true} />}
        {voulunteeringData?.volunteerings?.map((volunteering) => (
          <UserProfileSection
            key={volunteering.id}
            title={volunteering?.organization}
            startDate={formatDateByYearAndMonth(volunteering?.start_date)}
            endDate={formatDateByYearAndMonth(volunteering?.end_date)}
          >
            <p>{volunteering?.description}</p>
          </UserProfileSection>
        ))}
      </div>
      {/* Certificates Section */}
      <div className="border-b-2 border-[#eee] px-10 py-10 sm:px-20 md:px-10 lg:px-32">
        <p className="mb-5 text-xl font-semibold">Certificates</p>
        {loadingCertificates && <Loader forSection={true} />}
        {certificatesData?.certificates?.map((certificate) => (
          <UserProfileSection
            key={certificate.id}
            title={certificate?.title}
            startDate={formatDateByYearAndMonth(certificate?.start_date)}
            endDate={formatDateByYearAndMonth(certificate?.end_date)}
          >
            <p>{certificate?.issuing_organization}</p>
            <a href={certificate?.media} className="text-gray-500 underline">
              See the certificate
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </UserProfileSection>
        ))}
      </div>
    </div>
  );
}

export default UserProfileBody;
