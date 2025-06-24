import Navbar from "../components/home/Navbar.tsx";

function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="no-print">
        <Navbar />
      </div>
      <div className="min-h-screen bg-background px-4 py-10 md:px-20">
        {children}
      </div>
    </>
  );
}

export default ResumeBuilderLayout;
