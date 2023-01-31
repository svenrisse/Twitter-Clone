import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

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
    <div className="fixed top-0 right-0 flex w-1/4 justify-center ">
      <div className="flex space-y-4 px-12 py-16 text-lg">
        <div className="w-fit">
          <Link href={"/"}>
            <div className="group flex items-center rounded-md hover:bg-slate-300">
              <AiOutlineTwitter
                size={"2.5rem"}
                className={
                  focusedHome ? "fill-cyan-500" : "group-hover:fill-cyan-500"
                }
              />
              <span className={focusedHome ? "px-6 font-bold" : "px-6"}>
                Home
              </span>
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
              <span className={focusedLiked ? "px-6 font-bold" : "px-6"}>
                Liked
              </span>
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
                <span className={focusedProfile ? "px-6 font-bold" : "px-6"}>
                  Profile
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
