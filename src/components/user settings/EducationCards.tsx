import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProfileCard from "../common/ProfileCard";
import { useDeleteEducationMutation } from "../../services/profileApi";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Loader from "../common/Loader";

function EducationCards() {
  const navigate = useNavigate();
  const educations = useSelector(
    (state: RootState) => state.user.user.educations,
  );

  const [deleteEducation, { isLoading }] = useDeleteEducationMutation();

  async function handleDeleteCertificate(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.stopPropagation();
    try {
      await deleteEducation({ id: id.toString() }).unwrap();
      toast.success("Education deleted successfully");
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-20">
      <div className="grid grid-cols-2 gap-10 p-10">
        {educations?.map((education) => (
          <ProfileCard
            startDate={education.start_date}
            endDate={education.end_date}
            handleDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleDeleteCertificate(e, education.id)
            }
            handleEdit={() =>
              navigate(`/userSettings/profile/education/${education.id}`)
            }
            key={education.id}
            title={education.university}
          >
            {education.field_of_study}
            <br />
          </ProfileCard>
        ))}
      </div>
      <div
        className={`${educations?.length === 0 ? "self-center" : "self-end"}`}
      >
        <Button
          className="px-3"
          onClick={() => navigate("/userSettings/profile/education/0")}
        >
          {`${educations?.length === 0 ? "Add new" : "Add more"}`}
        </Button>
      </div>
    </div>
  );
}

export default EducationCards;
