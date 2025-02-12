import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDeleteExperienceMutation } from "../../services/profileApi";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import CreateExperience from "./CreateExperience";
import ProfileCard from "../common/ProfileCard";

function ExperienceCards() {
  const experiences = useSelector(
    (state: RootState) => state.user.user.experiences,
  );
  const [deleteExperience, { isLoading }] = useDeleteExperienceMutation();
  const navigate = useNavigate();

  async function handleDeleteExperience(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.stopPropagation();
    try {
      await deleteExperience({ id }).unwrap();
      toast.success("Experience deleted successfully");
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-2 p-10">
      {experiences?.length === 0 && <CreateExperience />}
      {experiences?.map((exp) => (
        <ProfileCard
          startDate={exp.start_date}
          endDate={exp.end_date}
          handleDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleDeleteExperience(e, exp.id)
          }
          handleEdit={() =>
            navigate(`/userSettings/profile/experience/${exp.id}`)
          }
          key={exp.id}
          title={exp.job_title}
        >
          <p className="text-gray-600">{exp.company_name}</p>
          <p className="text-sm text-gray-500">
            {exp.location} • {exp.location_type}
          </p>

          <div className="mt-3">
            <span className="text-blue-600 bg-blue-100 rounded-full py-1 text-sm font-medium">
              {exp.employment_type}
            </span>
          </div>
        </ProfileCard>
      ))}
    </div>
  );
}

export default ExperienceCards;
