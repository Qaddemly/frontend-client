import toast from "react-hot-toast";
import {
  IBusinessAccount,
  IIfFollowedByLoggedInUser,
} from "../../interfaces/BusinessAccount.interfaces";
import {
  useFollowBusinessMutation,
  useUnfollowBusinessMutation,
} from "../../services/businessAccountApi";
import { handleApiError } from "../../utils/helpers";
import Button from "../common/Button";

function CompanyProfileHeader({
  data,
  isFollowed,
  refetch,
}: {
  data: IBusinessAccount | undefined;
  isFollowed: IIfFollowedByLoggedInUser | null;
  refetch: () => void;
}) {
  const [followBusiness] = useFollowBusinessMutation();
  const [unFollowBusiness] = useUnfollowBusinessMutation();

  async function handleFollowBusiness() {
    try {
      const res = await followBusiness({
        id: data?.id.toString() || "",
      }).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUnfollowBusiness() {
    try {
      const res = await unFollowBusiness({
        id: data?.id.toString() || "",
      }).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-between bg-light-secondary">
      {/* Log, Info and Actions */}
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-evenly p-6 md:flex-row md:p-12">
        {/* Logo and Info Section */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="h-20 w-20 md:h-40 md:w-40">
            {/* rounded-full bg-background */}
            {/* <GoogleLogo/> */}
            <img
              src={data?.logo}
              alt="Company Logo"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            {/* need to align center in the y axis */}
            <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
              {data?.name} {/* Google Inc. */}
            </h1>
            {/* no rating in backend response */}
            {/* <span className="text-lg font-medium">{data}</span> */}
            {/* <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              <span>
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="text-gray-600">
                {numberOfReviews} {numberOfReviews <= 1 ? "review" : "reviews"}
              </span>
            </div> */}
          </div>
        </div>
        {/* Actions Section */}
        <div className="mt-6 flex items-center gap-4 md:mt-0">
          {isFollowed === null ? (
            <Button className="px-2" onClick={handleFollowBusiness}>
              Follow
            </Button>
          ) : (
            <Button className="px-2" onClick={handleUnfollowBusiness}>
              Unfollow
            </Button>
          )}
          {/* <Button className="px-2">Message</Button> */}
        </div>
      </div>
      {/* Navigation Section */}
      <div className="bor mb-0 flex w-full justify-center text-sm text-gray-600">
        <ul className="flex gap-10 border-b border-gray-600 sm:gap-20 md:gap-36">
          <li
            // href="#about-the-company" //في حاجة غلط مش عارفها
            className="cursor-pointer pb-2 hover:text-gray-800"
          >
            About Us
          </li>
          <li className="cursor-pointer pb-2 hover:text-gray-800">Jobs</li>
          <li className="cursor-pointer pb-2 hover:text-gray-800">Reviews</li>
        </ul>
      </div>
    </div>
  );
}

export default CompanyProfileHeader;
