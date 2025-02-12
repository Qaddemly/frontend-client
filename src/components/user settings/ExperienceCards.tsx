import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDeleteExperienceMutation } from "../../services/profileApi";
import Loader from "../common/Loader";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import CreateExperience from "./CreateExperience";

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
        <div
          key={exp.id}
          className="w-full max-w-md cursor-pointer rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg"
          onClick={() => navigate(`/userSettings/profile/experience/${exp.id}`)}
        >
          <h2 className="text-gray-900 text-xl font-semibold">
            {exp.job_title}
          </h2>
          <p className="text-gray-600">{exp.company_name}</p>
          <p className="text-sm text-gray-500">
            {exp.location} • {exp.location_type}
          </p>

          <div className="mt-3">
            <span className="text-blue-600 bg-blue-100 rounded-full py-1 text-sm font-medium">
              {exp.employment_type}
            </span>
          </div>

          <div className="mt-3 flex gap-5 text-sm text-gray-700">
            <div>
              <p>
                <span className="font-semibold">Start Date: </span>
                {new Date(exp.start_date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">End Date: </span>
                {exp.still_working
                  ? " Present"
                  : exp.end_date
                    ? new Date(exp.end_date).toLocaleDateString()
                    : " N/A"}
              </p>
            </div>
            <button
              onClick={(e) => handleDeleteExperience(e, exp.id)}
              className="rounded-md bg-danger-300 px-2 py-1 font-medium text-white hover:bg-danger-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperienceCards;
