import Navbar from "../components/home/Navbar.tsx";
import JobTrackerHeader from "../components/job/job tracker/JobTrackerHeader.tsx";
import Footer from "../components/home/Footer.tsx";
import { ReactNode } from "react";
import { useGetArchivedJobApplicationQuery } from "../services/jobApi.ts";

function JobTrackerLayout({ children }: { children: ReactNode }) {
  const { data } = useGetArchivedJobApplicationQuery();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-20">
        <JobTrackerHeader
          userType="user"
          archivedCount={data?.jobApplications?.length}
        />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default JobTrackerLayout;
