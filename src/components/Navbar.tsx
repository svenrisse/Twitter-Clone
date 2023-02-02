import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import ProfileBar from "./ProfileBar";

export default function Navbar({ focused }: { focused?: string }) {
  const { data, status } = useSession();

  return (
    <div className="fixed bottom-0 flex w-screen items-center rounded-t-md bg-slate-700 py-2 lg:left-14 lg:top-40 lg:h-56 lg:w-2/12 lg:rounded-xl lg:bg-slate-200 2xl:top-36 2xl:left-72 2xl:w-16">
      <ProfileBar />
      <div className="ml-auto flex justify-center gap-5 px-8 text-lg lg:ml-0 lg:mb-auto lg:flex-col lg:items-center 2xl:text-xl">
        <div className="w-fit lg:self-start">
          <Link href={"/"}>
            <div className="group flex items-center gap-5 rounded-md px-3 hover:bg-slate-300">
              <AiOutlineTwitter
                size={"2.5rem"}
                className={
                  focused == "home"
                    ? "fill-cyan-500"
                    : "group-hover:fill-cyan-500"
                }
              />
              <span className={focused == "home" ? "font-bold" : ""}>Home</span>
            </div>
          </Link>
        </div>
        {status === "authenticated" && (
          <div className="w-fit lg:self-start">
            <Link href={"/liked"}>
              <div className="group flex items-center gap-5 rounded-md px-3 hover:bg-slate-300">
                <AiFillHeart
                  size={"2.5rem"}
                  className={
                    focused == "liked"
                      ? "fill-cyan-500"
                      : "group-hover:fill-cyan-500"
                  }
                />
                <span className={focused == "liked" ? "font-bold" : ""}>
                  Liked
                </span>
              </div>
            </Link>
          </div>
        )}
        {status === "authenticated" && (
          <div className="w-fit lg:self-start">
            <Link
              href={{
                pathname: `${data?.user?.name}`,
                query: {
                  id: data?.user?.id,
                },
              }}
            >
              <div className="group flex items-center gap-5 rounded-md px-3 hover:bg-slate-300">
                <BsFillPersonFill
                  size={"2.5rem"}
                  className={
                    focused == "profile"
                      ? "fill-cyan-500"
                      : "group-hover:fill-cyan-500"
                  }
                />
                <span className={focused == "profile" ? "font-bold" : ""}>
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
