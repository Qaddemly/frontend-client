import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

type ReviewCardProps = {
  userName: string;
  date: string;
  text: string;
  img: string;
};

function ReviewCard({ userName, date, text, img }: ReviewCardProps) {
  return (
    <div className="flex w-[500rem] flex-col rounded-3xl bg-white p-12 sm:w-[500rem] md:w-[650rem] lg:w-[800rem]">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <img src={img} alt={userName} className="h-10 w-10 rounded-full" />
          <h3 className="text-lg font-medium">{userName}</h3>
        </div>
        <div className="text-2xl text-gray-800">
          <span>
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStarFilled} />
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold text-gray-800">{text}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
