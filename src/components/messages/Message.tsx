import Navbar from "../home/Navbar";
import Footer from "../home/Footer";

import NavMessage from "./NavMessage";
import ListMessage from "./ListMessages";

function Messaging() {
  return (
    <>
      <Navbar />

      <div className="flex h-screen flex-col bg-background p-6">
        <div className="flex h-screen flex-col rounded-xl border border-gray-200 bg-white p-4">
          <NavMessage />

          <div className="flex h-screen w-full flex-1 rounded-xl border border-gray-200 bg-white p-4 shadow">
            <ListMessage />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Messaging;
