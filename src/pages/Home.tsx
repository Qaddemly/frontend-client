import Main from "../components/home/Main";
import MainLayout from "../layout/MainLayout";

function Home() {
  return (
    <>
      <div className="bg-background">
        <MainLayout>
          <Main />
        </MainLayout>
      </div>
    </>
  );
}

export default Home;
