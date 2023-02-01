import { useRouter } from "next/router";
import { Timeline } from "../components/Timeline";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;

  const { data, isFetching } = trpc.user.getUser.useQuery({
    id: id,
  });

  const userId = useSession().data?.user?.id;

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center">
        <Navbar focusedProfile={id == userId ? true : false} />
        <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
          {isFetching ? (
            <Skeleton
              width={60}
              duration={0.5}
              borderRadius={24}
              inline={true}
            />
          ) : (
            <span>{`${data?.name}`}</span>
          )}
          {`'s Profile`}
        </h1>
        <div className="w-11/12">
          <div className="pt-10">
            <div className="ml-3">
              {isFetching ? (
                <Skeleton
                  height={100}
                  width={100}
                  duration={0.5}
                  borderRadius={100}
                />
              ) : (
                <Image
                  src={data?.image as string}
                  alt={`${data?.name} profile image`}
                  height={100}
                  width={100}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="pt-5">
              <h2 className="font-bold">
                @
                {isFetching ? (
                  <Skeleton width={50} duration={0.5} borderRadius={24} />
                ) : (
                  data?.name
                )}
              </h2>
              <div className="flex w-1/2 gap-10">
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isFetching ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      data?.tweet.length
                    )}
                  </span>
                  <span> Tweets</span>
                </div>
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isFetching ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      data?.likes.length
                    )}
                  </span>
                  <span> Liked </span>
                </div>
              </div>
            </div>
          </div>
          <Timeline
            where={{
              author: {
                name,
              },
            }}
            renderCreate={false}
          />
        </div>
      </div>
    </>
  );
}
