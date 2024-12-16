import React from "react";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import JobDescriptionItem from "../components/job profile/JobDescriptionItem";
import JobDescriptionSection from "../components/job profile/JobDescriptionSection";
import JobProfileBody from "../components/job profile/JobProfileBody";
import JobProfileHeader from "../components/job profile/JobProfileHeader";
import SimilarJobs from "../components/job profile/SimilarJobs";

type JobProfileProps = {
  name: string;
  rating: number;
  updateDate: string;
  // المفروض استلم ال تاريخ ازاي؟
  companyName: string;
  companyWebsite: string;
  location: string;
  decsription: string;
  employmentType: string;
  skills: string[];
  salary: string;
  position: string;
  experience: string;
};

function JobProfile({
  // logo,
  name = "Technical Support Specialist",
  rating = 4.2,
  updateDate = "2 days ago",
  companyName = "Google",
  companyWebsite = "www.google.com",
  location = "Gaza, Palastine",
  decsription = "We are seeking a highly motivated and customer-focused Technical Support Specialist to join our team. As a key member of the support team, you will be responsible for providing exceptional technical assistance to clients, resolving their issues, and ensuring seamless operation of our products and services. If you thrive in a fast-paced environment and enjoy solving technical problems, we'd love to hear from you!",
  employmentType = "Part-time",
  skills = [
    "Networking Basics",
    "System Diagnostics",
    "Customer Service Orientation",
    "Experience with Remote Support Tools",
    "Team collaboration",
    "Strong time management",
    "Analytical thinking",
    "Empathy",
  ],
  salary = "$20,000 - $25,000",
  position = "Team leader",
  experience = "10+ Years",
}: JobProfileProps) {
  return (
    <>
      <Navbar />

      <JobProfileHeader
        // logo={logo}
        name={name}
        rating={rating}
        updateDate={updateDate}
        companyName={companyName}
        companyWebsite={companyWebsite}
      />

      <JobProfileBody>
        <JobDescriptionSection>
          <JobDescriptionItem title="Location" content={location} />
          <JobDescriptionItem
            title="Full Job Description"
            content={decsription}
          />
          <JobDescriptionItem
            title="Employment Type"
            content={employmentType}
          />
          <JobDescriptionItem
            title="Skills"
            // عايزين نخليهم ليستتين جنب بعض
            content={
              <>
                {skills.map((skill, index) => (
                  <React.Fragment key={index}>
                    <span>{skill}</span>
                    <br />
                  </React.Fragment>
                ))}
              </>
            }
          />

          <JobDescriptionItem title="Expected Salary" content={salary} />
          <JobDescriptionItem title="Position" content={position} />
          <JobDescriptionItem title="Experience" content={experience} />
        </JobDescriptionSection>

        <SimilarJobs />
      </JobProfileBody>
      <Footer />
    </>
  );
}

export default JobProfile;
