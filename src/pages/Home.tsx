import Navbar from "../components/home/Navbar";
import Main from "../components/home/Main";
function Home() {
  return (
    <>
      <div className="bg-background">
        <Navbar />
        <Main />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Home;
