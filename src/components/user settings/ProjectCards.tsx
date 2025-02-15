import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDeleteProjectMutation } from "../../services/profileApi";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/helpers";
import Loader from "../common/Loader";

function ProjectCards() {
  const naviagate = useNavigate();
  const projects = useSelector((state: RootState) => state.user.user.project);
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  async function handleDeleteProject(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.stopPropagation();
    try {
      await deleteProject({ id }).unwrap();
      toast.success("Certificate deleted successfully");
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-2 p-10">
      {projects?.map((pro) => (
        <ProfileCard
          startDate={pro.start_date}
          endDate={pro.end_date}
          handleDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleDeleteProject(e, pro.id)
          }
          handleEdit={() =>
            naviagate(`/userSettings/profile/project/${pro.id}`)
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
      {/* <ProfileCard
        title="E-Commerce Website"
        startDate="Jan 2022"
        endDate="May 2022"
        handleDelete={() => {}}
        handleEdit={() => naviagate(`/userSettings/profile/projects/1`)}
      >
        <p>A fully functional e-commerce plat</p>
        <p>Skills: HTML, CSS, JavaScri...</p>
      </ProfileCard> */}
    </div>
  );
}

export default ProjectCards;
