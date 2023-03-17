import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Tweet } from "../components/Timeline";
import { trpc } from "../utils/trpc";
import { ThreeDots } from "react-loader-spinner";
import Rightbar from "../components/Rightbar";

export default function Followed() {
  const { data: session } = useSession();

  const { data, isInitialLoading } = trpc.user.followTweets.useQuery({
    id: session?.user?.id,
  });

  return (
    <>
      <Navbar focused="followed" />
      <Rightbar />
      <div className="flex min-h-screen flex-col items-center">
        <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
          Your Personal Timeline
        </h1>
        {isInitialLoading ? (
          <ThreeDots color="cyan" height="100" />
        ) : (
          <div className="mt-12 mb-20 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2 2xl:w-5/12"></div>
        )}
      </div>
    </>
  );
}
