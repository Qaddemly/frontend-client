import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import Slider from "../components/common/Slider";
import SidebarFilter from "../components/company profile/SidebarFilter";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import JobCard from "../components/common/JobCard";
import { EmploymentType } from "../enums/index.enums";
import { useGetAllJobsQuery } from "../services/jobApi";
import Loader from "../components/common/Loader";

function FindJob() {
  const employmentTypeValues = Object.values(EmploymentType);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetAllJobsQuery({});

  if (isLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <div>
        <div className="w-full bg-background pb-20">
          {/* Heading and search bar */}
          <div className="mx-6 max-w-5xl px-7 py-10 md:mx-4">
            <h2 className="text-4xl text-gray-800 md:text-3xl">
              Find your dream job
            </h2>
            <p className="mt-2 text-gray-600">Get access to millions of jobs</p>
            <div className="flex items-center gap-10 py-6">
              <SearchBar placeholder="Job name" buttonName="Find jobs" />
              {!isOpen && (
                <Button
                  className="hover:none flex items-center gap-2 bg-white px-5 text-lg text-main"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Filters
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="rounded-md bg-main p-3 text-xl text-white"
                  />
                </Button>
              )}
            </div>
          </div>
          {/*End of heading and search bar */}

          {/* Popular companies */}
          <div className="mx-6 mt-5 px-7 md:mx-4">
            <h3 className="text-2xl text-gray-800 md:text-3xl">
              Most viewed jobs
            </h3>
            <div
              className={`mt-8 grid gap-6 ${isOpen ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}
            >
              {data?.jobs.data.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          </div>
          {/* End of popular companies */}
        </div>

        {/* Sidebar filter */}
        <SidebarFilter setIsOpen={setIsOpen} isOpen={isOpen} title="Job filter">
          <Select isFilter={true} label="Employment type" id="EmploymentType">
            {employmentTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select isFilter={true} label="Industry type" id="industryType">
            {/* {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
              ))} */}
            <option value="">Select industy</option>
          </Select>
          <Slider label="Salary" min={0} max={1000} />

          {/* complete the filter with backend */}
          <Button className="my-5">Filter Jobs</Button>
        </SidebarFilter>
      </div>
      <Footer />
    </>
  );
}

export default FindJob;
