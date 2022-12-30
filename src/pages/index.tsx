import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";
import { Timeline } from "../components/Timeline";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Timeline renderCreate={true} where={{}} />
      </div>
    </>
  );
};

export default Home;
