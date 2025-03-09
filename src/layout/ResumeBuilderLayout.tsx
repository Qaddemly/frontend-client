import Navbar from "../components/home/Navbar.tsx";

function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-20">{children}</div>
    </>
  );
}

export default ResumeBuilderLayout;
