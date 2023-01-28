import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  AiFillBell,
  AiFillHeart,
  AiFillHome,
  AiFillMessage,
  AiOutlineTwitter,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsFillPersonFill, BsHash } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import ProfileBar from "./ProfileBar";

export default function Leftbar() {
  const { data, status } = useSession();

  return (
    <div className="fixed left-0 flex w-1/4 justify-center ">
      <div className="flex flex-col justify-between space-y-4 px-12 py-16 text-lg">
        <div className="w-fit">
          <Link href={"/"}>
            <AiOutlineTwitter
              color="black"
              size="3rem"
              className="hover:fill-cyan-500"
            />
          </Link>
        </div>
        <div className="w-fit">
          <Link href={"/"}>
            <div className="group flex items-center rounded-md hover:bg-slate-300">
              <AiFillHome
                size={"2.5rem"}
                className="group-hover:fill-cyan-500"
              />
              <span className="px-6">Home</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center ">
          <BsHash size={"2.5rem"} color="gray" />
          <span className="px-6 text-gray-400">Explore</span>
        </div>
        <div className="flex items-center ">
          <AiFillBell size={"2.5rem"} color="gray" />
          <span className="px-6 text-gray-400">Notifications</span>
        </div>
        <div className="flex items-center ">
          <AiFillMessage size={"2.5rem"} color="gray" />
          <span className="px-6 text-gray-400">Messages</span>
        </div>
        <div className="w-fit">
          <Link href={"/liked"}>
            <div className="group flex items-center rounded-md hover:bg-slate-300">
              <AiFillHeart
                size={"2.5rem"}
                className="group-hover:fill-cyan-500"
              />
              <span className="px-6">Liked</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center ">
          <AiOutlineUnorderedList size={"2.5rem"} color="gray" />
          <span className="px-6 text-gray-400">Lists</span>
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
                  className="group-hover:fill-cyan-500"
                />
                <span className="px-6">Profile</span>
              </div>
            </Link>
          </div>
        )}
        <div className="flex items-center ">
          <CiCircleMore size={"2.5rem"} color="gray" />
          <span className="px-6 text-gray-400">More</span>
        </div>
      </div>
      <ProfileBar />
    </div>
  );
}
