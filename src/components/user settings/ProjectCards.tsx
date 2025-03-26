import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "../../services/profileApi";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/helpers";
import Loader from "../common/Loader";
import Button from "../common/Button";

function ProjectCards() {
  const navigate = useNavigate();

  const [deleteProject, { isLoading: isLoading1 }] = useDeleteProjectMutation();
  const { data, isLoading: isLoading2, refetch } = useGetAllProjectsQuery({});
  const projects = data?.projects;

  async function handleDeleteProject(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.stopPropagation();
    try {
      await deleteProject({ id }).unwrap();
      toast.success("Project deleted successfully");
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-5 p-10">
        {projects?.map((pro) => (
          <ProfileCard
            startDate={pro.start_date}
            endDate={pro.end_date}
            handleDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleDeleteProject(e, pro.id)
            }
            handleEdit={() =>
              navigate(`/userSettings/profile/projects/${pro.id}`)
            }
            key={pro.id}
            title={pro.name}
          >
            <p className="text-gray-600">{pro.link}</p>
            <div className="mt-3">
              <span className="text-blue-600 bg-blue-100 rounded-full py-1 text-sm font-medium">
                {pro.description}
              </span>
            </div>
          </ProfileCard>
        ))}
      </div>
      <div className={`${projects?.length === 0 ? "self-center" : "self-end"}`}>
        <Button
          className="px-3"
          onClick={() => navigate("/userSettings/profile/projects/0")}
        >
          {`${projects?.length === 0 ? "Add new" : "Add more"}`}
        </Button>
      </div>
    </div>
  );
}

export default ProjectCards;
