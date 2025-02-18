import Footer from "../../home/Footer";
import Navbar from "../../home/Navbar";
import JobTrackerHeader from "./JobTrackerHeader";

function JobTrackerArchived() {
  return (
    <>
      <Navbar />
      <div className="bg-background p-20">
        <JobTrackerHeader />
      </div>
      <Footer />
    </>
  );
}

export default JobTrackerArchived;
