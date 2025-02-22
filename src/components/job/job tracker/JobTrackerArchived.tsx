import Footer from "../../home/Footer";
import Navbar from "../../home/Navbar";
import JobTrackerHeader from "./JobTrackerHeader";
import JobTrackerItem from "./JobTrackerItem";

function JobTrackerArchived() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-20">
        <JobTrackerHeader userType="user" />
        <JobTrackerItem userType="user" archive={false} />
      </div>
      <Footer />
    </>
  );
}

export default JobTrackerArchived;
