import { type NextPage } from "next";
import { Timeline } from "../components/Timeline";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen justify-center bg-slate-200">
      <Timeline renderCreate={true} where={{}} />
      <Navbar focused={"home"} />
      <Rightbar />
    </div>
  );
};

export default Home;
