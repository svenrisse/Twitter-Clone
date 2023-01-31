import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import ProfileBar from "./ProfileBar";

export default function Navbar({
  focusedHome,
  focusedLiked,
  focusedProfile,
}: {
  focusedHome?: boolean;
  focusedLiked?: boolean;
  focusedProfile?: boolean;
}) {
  const { data, status } = useSession();

  return (
    <div className="fixed bottom-0 flex w-screen items-center bg-slate-700">
      <ProfileBar />
      <div className="ml-auto flex justify-center gap-5 px-4 text-lg">
        <div className="w-fit">
          <Link href={"/"}>
            <div className="group flex items-center rounded-md hover:bg-slate-300">
              <AiOutlineTwitter
                size={"2.5rem"}
                className={
                  focusedHome ? "fill-cyan-500" : "group-hover:fill-cyan-500"
                }
              />
            </div>
          </Link>
        </div>
        <div className="w-fit">
          <Link href={"/liked"}>
            <div className="group flex items-center rounded-md hover:bg-slate-300">
              <AiFillHeart
                size={"2.5rem"}
                className={
                  focusedLiked ? "fill-cyan-500" : "group-hover:fill-cyan-500"
                }
              />
            </div>
          </Link>
        </div>
        {status === "authenticated" && (
          <div className="flex items-center ">
            <Link
              href={{
                pathname: `${data?.user?.name}`,
                query: {
                  id: data?.user?.id,
                },
              }}
            >
              <div className="group flex items-center rounded-md hover:bg-slate-300">
                <BsFillPersonFill
                  size={"2.5rem"}
                  className={
                    focusedProfile
                      ? "fill-cyan-500"
                      : "group-hover:fill-cyan-500"
                  }
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
