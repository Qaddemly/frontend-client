import Navbar from "../components/home/Navbar";
import Main from "../components/home/Main";

function Home() {
  // const dispatch = useDispatch();
  // const [trigger] = useLazyGetUserQuery();

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   if (urlParams.has("googleAuthSuccess")) {
  //     trigger()
  //       .unwrap()
  //       .then((userData) => {
  //         dispatch(setUser(userData.user));
  //       })
  //       .catch((err) => {
  //         console.error("Failed to fetch user data:", err);
  //       });
  //   }
  // }, [dispatch, trigger]);

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
