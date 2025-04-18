import React, { useState } from "react";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import JobDescriptionItem from "../components/job/job profile/JobDescriptionItem";
import JobDescriptionSection from "../components/job/job profile/JobDescriptionSection";
import JobProfileBody from "../components/job/job profile/JobProfileBody";
import JobProfileHeader from "../components/job/job profile/JobProfileHeader";
import { useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../services/jobApi";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

function JobProfile() {
  const { jobId } = useParams();

  const { data, isLoading } = useGetJobDetailsQuery({ id: jobId || "" });
  const [showModal, setShowModal] = useState(false);

  const job = data?.job;

  if (isLoading) return <Loader />;

  return (
    <>
      <Navbar />
      {job && <JobProfileHeader job={job} setShowModal={setShowModal} />}

      <JobProfileBody>
        {showModal && (
          <Modal setClose={setShowModal}>
            <div className="flex flex-col justify-center gap-9 p-5 md:p-10 lg:gap-16 lg:p-14">
              <p className="text-5xl font-semibold">Choose your Application</p>
              <div className="flex flex-col gap-5 lg:gap-9">
                <Button>
                  {/* TODO : onClick send profile info to backend then ask for resume and questions(if needed) */}
                  <p className="text-3xl">Easy Apply</p>
                  <p className="text-2xl">(Apply with your profile Info.)</p>
                </Button>
                <Button>
                  {/* TODO : onClick open custom forms and send to backend then ask for resume and questions(if needed) */}
                  <p className="text-3xl">Custom Apply</p>
                  <p className="text-2xl">(Create your custom application)</p>
                </Button>
              </div>
            </div>
          </Modal>
        )}
        <JobDescriptionSection>
          <JobDescriptionItem
            title="Location"
            content={`${job?.country || "No country"}, ${job?.city || "No city"}`}
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
          {/*TODO: ask backend about position */}
          {/* <JobDescriptionItem title="Position" content={job.position} /> */}
          <JobDescriptionItem title="Experience" content={job?.experience} />
        </JobDescriptionSection>
        {/* <SimilarJobs /> */}
      </JobProfileBody>
      <Footer />
    </>
  );
}

export default JobProfile;
