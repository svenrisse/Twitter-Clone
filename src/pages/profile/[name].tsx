import { useRouter } from "next/router";
import { Timeline } from "../../components/Timeline";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;

  const { data, isInitialLoading } = trpc.user.getUser.useQuery({
    id: id,
  });

  const userId = useSession().data?.user?.id;

  return (
    <>
      <Navbar focused={id == userId ? "profile" : ""} />
      <Rightbar />
      <div className="flex min-h-screen w-screen flex-col items-center">
        <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
          {isInitialLoading ? (
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
        <div className="flex w-11/12 flex-col items-center">
          <div className="pt-10">
            <div className="ml-3">
              {isInitialLoading ? (
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
                {isInitialLoading ? (
                  <Skeleton width={50} duration={0.5} borderRadius={24} />
                ) : (
                  data?.name
                )}
              </h2>
              <div className="flex w-1/2 gap-10">
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isInitialLoading ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      data?.tweet.length
                    )}
                  </span>
                  <span>Tweets</span>
                </div>
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isInitialLoading ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      (data?._count.tweet as number) -
                      (data?.tweet.length as number)
                    )}
                  </span>
                  <span>Comments</span>
                </div>
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isInitialLoading ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      data?.likes.length
                    )}
                  </span>
                  <span>Liked</span>
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
