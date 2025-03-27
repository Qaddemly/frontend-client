import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarFilled,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Chat from "../messages/Chat";

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

  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };
  const chatMessages: {
    text: string;
    sender: "user" | "business";
    time: string;
  }[] = [
    {
      text: "Hello, how can we help you?",
      sender: "business",
      time: "10:00 AM",
    },
    {
      text: "I need some information.",
      sender: "user",
      time: "10:02 AM",
    },
    {
      text: "Sure! Please tell us what you need.",
      sender: "business",
      time: "10:03 AM",
    },
  ];

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
            <span className="text-lg font-medium">
              {data?.reviewsRatingsQuantity}
            </span>
            <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              <span>
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarFilled} />
                <FontAwesomeIcon icon={faStarHalfStroke} />
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="text-gray-600">
                {data?.reviewsRatingsQuantity === 0
                  ? "No Rating"
                  : data?.reviewsRatingsQuantity}
                {/* <= 1  ? "review" : "reviews" */}
              </span>
            </div>
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
          {/* Message */}

          <Button className="px-2" onClick={handleOpenChat}>
            Message
          </Button>
          <div className="fixed bottom-0 right-4 w-full max-w-lg rounded-t-xl border border-gray-300 bg-white shadow-xl">
            {isChatOpen && (
              <Chat
                title={data?.name || "Company Chat"}
                website={data?.website}
                messages={chatMessages}
                onBack={() => setIsChatOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
      {/* Navigation Section */}
      <div className="bor mb-0 flex w-full justify-center text-sm text-gray-600">
        <ul className="flex gap-10 border-b border-gray-600 sm:gap-20 md:gap-36">
          <li className="cursor-pointer pb-2 hover:text-gray-800">
            <a href="#about-the-company">About Us</a>
          </li>
          <li className="cursor-pointer pb-2 hover:text-gray-800">
            <a href="#valid-jobs">Jobs</a>
          </li>
          <li className="cursor-pointer pb-2 hover:text-gray-800">
            <a href="#job-reviews">Reviews</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CompanyProfileHeader;
