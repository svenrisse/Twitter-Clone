import { type NextPage } from "next";
import Head from "next/head";
import { Timeline } from "../components/Timeline";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <Leftbar />
        <Timeline renderCreate={true} where={{}} />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
