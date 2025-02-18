import Navbar from "../components/home/Navbar";
import JobTrackerHeader from "../components/job/job tracker/JobTrackerHeader";
import Footer from "../components/home/Footer";
import JobTrackerItem from "../components/job/job tracker/JobTrackerItem";

function JobTracker() {
  return (
    <>
      <Navbar />
      <div className="bg-background p-20">
        <JobTrackerHeader />
        <JobTrackerItem />
        <JobTrackerItem />
      </div>
      <Footer />
    </>
  );
}

export default JobTracker;
