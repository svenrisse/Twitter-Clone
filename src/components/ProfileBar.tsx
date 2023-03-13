import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ProfileBar() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <div className="lg:fixed lg:bottom-4">
      <div
        onClick={openModal}
        className="w-40 cursor-pointer rounded-full lg:flex lg:items-center lg:justify-around lg:gap-2 lg:bg-slate-300 lg:py-2"
      >
        <Image
          src={data.user?.image as string}
          alt={`${data.user?.name} profile picture`}
          width={30}
          height={30}
          className="ml-4 rounded-full lg:ml-2"
        />
        <span className="hidden text-xs lg:block lg:font-semibold">
          {data.user?.name}
        </span>
        <BsThreeDotsVertical
          className="hidden cursor-pointer rounded-xl py-1 hover:bg-slate-400 lg:mr-2 lg:block"
          size={"1.5rem"}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed bottom-20 left-2 border-0 lg:left-28 lg:bottom-24 2xl:left-96"
      >
        <button
          className="w-20 rounded-xl bg-cyan-700 py-2"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </Modal>
    </div>
  );
}
