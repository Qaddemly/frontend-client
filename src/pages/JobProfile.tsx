import React from "react";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import JobDescriptionItem from "../components/job/job profile/JobDescriptionItem";
import JobDescriptionSection from "../components/job/job profile/JobDescriptionSection";
import JobProfileBody from "../components/job/job profile/JobProfileBody";
import JobProfileHeader from "../components/job/job profile/JobProfileHeader";
import SimilarJobs from "../components/job/job profile/SimilarJobs";
import { useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../services/jobApi";
import Loader from "../components/common/Loader";

function JobProfile() {
  const { jobId } = useParams();

  const { data, isLoading } = useGetJobDetailsQuery({ id: jobId || "" });
  const job = data?.job;

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      {job && <JobProfileHeader job={job} />}

      <JobProfileBody>
        <JobDescriptionSection>
          <JobDescriptionItem
            title="Location"
            content={`${job?.location.country}, ${job?.location.city}`}
          />
          <JobDescriptionItem
            title="Full Job Description"
            content={job?.description}
          />
          <JobDescriptionItem
            title="Employment Type"
            content={job?.employee_type}
          />
          <JobDescriptionItem
            title="Skills"
            // عايزين نخليهم ليستتين جنب بعض
            content={
              <>
                {job?.skills.map((skill, index) => (
                  <React.Fragment key={index}>
                    <span>{skill}</span>
                    <br />
                  </React.Fragment>
                ))}
              </>
            }
          />

          <JobDescriptionItem title="Expected Salary" content={job?.salary} />
          {/* ask backend about position */}
          {/* <JobDescriptionItem title="Position" content={job.position} /> */}
          <JobDescriptionItem title="Experience" content={job?.experience} />
        </JobDescriptionSection>
        <SimilarJobs />
      </JobProfileBody>
      <Footer />
    </>
  );
}

export default JobProfile;
