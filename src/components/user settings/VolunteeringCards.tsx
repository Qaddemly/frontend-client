import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";
import Loader from "../common/Loader";
import { useDeleteVolunteeringMutation } from "../../services/profileApi";
import Button from "../common/Button";
import { useGetAllVolunteeringsQuery } from "../../services/profileApi";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";

function VolunteeringCards() {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isLoading1,
    refetch,
  } = useGetAllVolunteeringsQuery({});
  const volunteerings = data?.volunteerings;
  const [deleteVolunteering, { isLoading: isLoading2 }] =
    useDeleteVolunteeringMutation();
  async function handleDeleteVolunteering(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.stopPropagation();
    try {
      await deleteVolunteering({ id }).unwrap();
      toast.success("Volunteering deleted successfully");
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-8 p-10">
        {volunteerings?.map((volun) => (
          <ProfileCard
            startDate={volun.start_date}
            endDate={volun.end_date}
            handleDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleDeleteVolunteering(e, volun.id)
            }
            handleEdit={() =>
              navigate(`/userSettings/profile/volunteering/${volun.id}`)
            }
            key={volun.id}
            title={volun.organization}
          >
            {volun.description}
            <br /> {volun.role}
          </ProfileCard>
        ))}
      </div>

      <div
        className={`${volunteerings?.length === 0 ? "self-center" : "self-end"}`}
      >
        <Button
          className="px-3"
          onClick={() => navigate("/userSettings/profile/volunteering/0")}
        >
          {`${volunteerings?.length === 0 ? "Add new" : "Add more"}`}
        </Button>
      </div>
    </div>
  );
}

export default VolunteeringCards;
