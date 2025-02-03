import CompanyProfileCard from "./CompanyProfileCard";
import ReviewCard from "../common/ReviewCard";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBusinessAccount } from "../../interfaces/BusinessAccount.interfaces";
import {
  useGetFiveReviewsQuery,
  useLazyGetAllReviewsQuery,
} from "../../services/businessAccountApi";
import { useState } from "react";

type CompanyProfileBodyProps = {
  data: IBusinessAccount | undefined;
  id: number;
};

function CompanyProfileBody({
  data: companyData,
  id,
}: CompanyProfileBodyProps) {
  // const { data: sixJobsData } = useGetSixJobsQuery({ id });
  const { data: fiveReviewsData } = useGetFiveReviewsQuery({ id });
  // const [triggerAllJobs, { data: allJobsData }] = useLazyGetAllJobsQuery();
  const [triggerAllReviews, { data: allReviewsData }] =
    useLazyGetAllReviewsQuery();
  // const [viewAllJobs, setViewAllJobs] = useState(false);
  const [viewAllReviews, setViewAllReviews] = useState(false);
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
          <CompanyProfileCard
            title="Website"
            description={companyData?.website}
          />
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

      {/* Valid jobs section  */}
      <div className="relative mx-auto max-w-[1000px] px-6 py-12 md:px-12">
        {/* Section Title */}
        <div className="flex items-center justify-between font-semibold">
          <h2 className="text-2xl text-gray-800 md:text-3xl">Valid jobs</h2>
          <button
            className="space-x-2 self-end text-xl text-main"
            // onClick={() => {
            //   triggerAllJobs({ id });
            //   setViewAllJobs(true);
            // }}
          >
            <span>View all</span>
            <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>

        {/* Valid jobs */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* {viewAllJobs
            ? sixJobsData?.jobs.map((job) => (
                <JobCard
                  key={job.job_id}
                  jobTitle={job.job_title}
                  employmentType={job.job_employee_type}
                  salaryRange={job.job_salary.toString()}
                  companyName={job.business_name}
                  companyLocation={job.job_location}
                />
              ))
            : allJobsData?.jobs.map((job) => (
                <JobCard
                  key={job.job_id}
                  jobTitle={job.job_title}
                  employmentType={job.job_employee_type}
                  salaryRange={job.job_salary.toString()}
                  companyName={job.business_name}
                  companyLocation={job.job_location}
                />
              ))} */}
        </div>
      </div>

      {/* Reviews section  */}
      <div className="relative mx-auto max-w-[1000px] px-6 py-12 md:px-12">
        <div className="mb-10 flex items-center justify-between font-semibold">
          <h2 className="text-2xl text-gray-800 md:text-3xl">Reviews</h2>
          <button
            className="space-x-2 self-end text-xl text-main"
            onClick={() => {
              triggerAllReviews({ id });
              setViewAllReviews(true);
            }}
          >
            <span>View all</span>
            <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>

        {/* Reviews */}
        <div className="flex w-[140rem] animate-slide space-x-10">
          {viewAllReviews
            ? fiveReviewsData?.reviews.map((review) => (
                <ReviewCard
                  key={review.review_account_id}
                  userName={`${review.account_first_name} ${review.account_last_name}`}
                  date={review.review_created_at}
                  text={review.review_description}
                  img={review.account_profile_picture}
                />
              ))
            : allReviewsData?.reviews.map((review) => (
                <ReviewCard
                  key={review.review_account_id}
                  userName={`${review.account_first_name} ${review.account_last_name}`}
                  date={review.review_created_at}
                  text={review.review_description}
                  img={review.account_profile_picture}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyProfileBody;
