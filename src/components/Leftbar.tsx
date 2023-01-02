import Link from "next/link";
import { AiOutlineTwitter } from "react-icons/ai";
export default function Leftbar() {
  return (
    <div className="fixed left-0 flex w-1/4 justify-end px-12">
      <div>
        <Link href={"/"}>
          <AiOutlineTwitter
            color="black"
            size="3rem"
            className="hover:fill-cyan-500"
          />
        </Link>
      </div>
    </div>
  );
}
