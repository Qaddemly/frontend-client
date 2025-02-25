import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../utils/helpers";

type ReviewCardProps = {
  userName: string;
  date: string;
  text: string;
  img: string;
  rating: string;
};

function ReviewCard({ userName, date, text, img, rating }: ReviewCardProps) {
  return (
    <div className="flex w-[40rem] flex-col rounded-3xl bg-white p-8">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <img
            src={img}
            alt={userName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <h3 className="text-lg font-medium">{userName}</h3>
        </div>
        <div className="text-2xl text-gray-800">
          <span>
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                className="text-main"
                key={i}
                icon={i < Number(rating) ? faStarFilled : faStar}
              />
            ))}
          </span>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-lg font-bold text-gray-800">{text}</p>
        <p className="text-sm text-gray-500">{formatDate(date)}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
