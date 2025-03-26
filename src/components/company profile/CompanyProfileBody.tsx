import CompanyProfileCard from "./CompanyProfileCard";
import ReviewCard from "../common/ReviewCard";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IBusinessAccount,
  IReview,
} from "../../interfaces/BusinessAccount.interfaces";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetBusinessReviewsQuery,
  useUpdateReviewMutation,
} from "../../services/businessAccountApi";
import { useMemo, useState } from "react";
import Button from "../common/Button";
import Slider from "../common/Slider";
import { handleApiError } from "../../utils/helpers";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useGetRecommendedJobsQuery } from "../../services/jobApi";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";

type CompanyProfileBodyProps = {
  data: IBusinessAccount | undefined;
  id: number;
};

function CompanyProfileBody({
  data: companyData,
  id,
}: CompanyProfileBodyProps) {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  ////////////////////////////////////  Recommended jobs  //////////////////////////////////////////////
  const { data: jobs, isLoading: loadingRecommendedJobs } =
    useGetRecommendedJobsQuery();
  const recommendedJobs = useMemo(
    () => jobs?.recommendedJobs?.slice() || [],
    [jobs],
  );

  const fiveRandomJobs = useMemo(() => {
    return recommendedJobs.sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [recommendedJobs]);

  ////////////////////////////////////  Adding, updating and deleting review  //////////////////////////////////////////////
  const { data, refetch } = useGetBusinessReviewsQuery({
    id: id.toString(),
  });
  const currentReview: IReview | null =
    data?.reviews?.filter((review) => review?.account_id === user?.id)[0] ||
    null;

  const [showEditReview, setShowEditReview] = useState(false);
  const [description, setDescription] = useState(
    currentReview?.review_description || "",
  );
  const [rating, setRating] = useState(currentReview?.review_rating || 1);

  const [addReview] = useAddReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  async function handleAddReview() {
    if (description.length)
      try {
        const res = addReview({
          data: {
            description,
            rating: Number(rating),
            business_id: id,
            account_id: Number(user.id),
          },
        }).unwrap();

        toast.promise(res, {
          loading: "Adding...",
          success: <b>Review added successfully</b>,
          error: <b>Could not add the review.</b>,
        });
        await res;

        refetch();
      } catch (error) {
        handleApiError(error);
      }
  }

  async function handleUpdateReview() {
    if (description.length)
      try {
        const res = updateReview({
          data: {
            rating: Number(rating),
            description,
          },
          id: currentReview?.review_id.toString() || "",
        }).unwrap();

        toast.promise(res, {
          loading: "Updating...",
          success: <b>Review updated successfully</b>,
          error: <b>Could not update the review.</b>,
        });
        await res;
        refetch();
        setShowEditReview(false);
      } catch (error) {
        handleApiError(error);
      }
  }

  async function handleDeleteReview() {
    try {
      const deletePromise = deleteReview({
        id: currentReview?.review_id.toString() || "",
      }).unwrap();

      toast.promise(deletePromise, {
        loading: "Deleting...",
        success: <b>Review deleted successfully!</b>,
        error: <b>Could not delete the review.</b>,
      });
      await deletePromise;
      refetch();
      setDescription("");
      setRating(1);
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <div className="overflow-hidden">
      {/* About Us section  */}
      <div className="mx-auto max-w-[1000px] px-6 py-12 md:px-12">
        {/* Section Title */}
        <h2
          id="about-the-company"
          className="mb-8 text-center text-2xl font-semibold text-gray-800 md:text-3xl"
        >
          About the company
        </h2>
        {/* Cards Section */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          <CompanyProfileCard title="CEO" description={companyData?.CEO} />
          <CompanyProfileCard
            title="Founded"
            description={companyData?.founded}
          />
          {/* there is no revenue in backend response */}
          {/* <CompanyProfileCard title="Revenue" description="Over $280B" /> */}
          <CompanyProfileCard
            title="Company Size"
            description={companyData?.company_size.toString()}
          />
          <CompanyProfileCard
            title="Founder"
            description={companyData?.founder}
          />
          {/* <CompanyProfileCard
            title="Website"
            description={companyData?.website}
          /> */}
          <CompanyProfileCard
            title="Headquarters"
            description={companyData?.headquarter}
          />
          <CompanyProfileCard
            title="Industry"
            description={companyData?.industry}
          />
        </div>
        {/* Description Section */}
        <div className="text-left text-gray-500">
          <p className="mb-4 text-sm leading-relaxed md:text-base">
            {companyData?.description}
          </p>
          {/* learn more will go to company website */}
          <a href={companyData?.website} className="text-main hover:underline">
            Learn more
          </a>
        </div>
      </div>

      {/* Recommended jobs section  */}
      <div
        className="relative mx-auto max-w-[1000px] px-6 py-12 md:px-12"
        id="valid-jobs"
      >
        {/* <Loader forSection={true} /> */}
        {/* Section Title */}
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-2xl text-gray-800 md:text-3xl">
            Recommended jobs
          </h2>
          <button
            className="space-x-2 self-end text-xl text-main"
            onClick={() => navigate("/findjob")}
          >
            <span className="font-medium">find more jobs</span>
            <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>

        {/* Recommended jobs */}
        {loadingRecommendedJobs && <Loader forSection={true} />}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {fiveRandomJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* Reviews section  */}
      <div
        className="relative mx-auto max-w-[1000px] px-6 py-12 md:px-12"
        id="job-reviews"
      >
        <div className="mb-10 flex items-center justify-between font-semibold">
          <h2 className="text-2xl text-gray-800 md:text-3xl">Reviews</h2>
          <button
            className="space-x-2 self-end text-xl text-main"
            onClick={() => {
              // triggerAllReviews({ id: id.toString() });
              // setViewAllReviews(true);
            }}
          >
            {/* <span>View all</span>
            <FontAwesomeIcon icon={faCircleRight} /> */}
          </button>
        </div>

        {/* Reviews */}
        {data?.reviews.length === 0 && (
          <p className="italic text-gray-300">No reviews</p>
        )}
        <div className="my-20 flex w-[140rem] animate-slide space-x-10">
          {data?.reviews.map((review) => (
            <ReviewCard
              key={review?.review_business_id}
              userName={`${review.account_first_name} ${review.account_last_name}`}
              date={review.review_created_at}
              text={review.review_description}
              img={review.account_profile_picture}
              rating={review.review_rating}
            />
          ))}
        </div>

        {/* Adding reviews */}
        <div className="mt-5 flex flex-col gap-5">
          {currentReview === null ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                Add your review
              </h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`min-h-[14rem] rounded-md border-2 border-gray-100 p-5 outline-none lg:min-h-[15rem] lg:bg-[#eee]`}
                placeholder="Enter your review"
              />
              <div className="flex items-center justify-between">
                <div>
                  <Slider
                    value={Number(rating)}
                    setValue={setRating}
                    label="Rating"
                    min={1}
                    max={5}
                  />
                </div>
                <div>
                  <Button onClick={handleAddReview} className="px-3">
                    Add review
                  </Button>
                </div>
              </div>
            </>
          ) : (
            !showEditReview && (
              <div>
                <h2 className="mb-5 text-2xl font-semibold text-gray-800 md:text-3xl">
                  Your review
                </h2>
                <div className="my-10 flex justify-center">
                  <ReviewCard
                    userName={`${currentReview.account_first_name} ${currentReview.account_last_name}`}
                    date={currentReview.review_created_at}
                    text={currentReview.review_description}
                    img={currentReview.account_profile_picture}
                    rating={currentReview.review_rating}
                  />
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button
                    onClick={() => setShowEditReview(true)}
                    className="mt-2 px-3"
                  >
                    Edit your review
                  </Button>
                  <Button
                    onClick={handleDeleteReview}
                    className="mt-2 bg-danger-300 px-3 hover:bg-danger-200"
                  >
                    Delete your review
                  </Button>
                </div>
              </div>
            )
          )}

          {showEditReview && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                Edit your review
              </h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`min-h-[14rem] rounded-md border-2 border-gray-100 p-5 outline-none lg:min-h-[15rem] lg:bg-[#eee]`}
                placeholder="Enter your review"
              />
              <div className="flex items-center justify-between">
                <div>
                  <Slider
                    value={Number(rating)}
                    setValue={setRating}
                    label="Rating"
                    min={1}
                    max={5}
                  />
                </div>
                <div>
                  <Button onClick={handleUpdateReview} className="px-3">
                    Edit review
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyProfileBody;
