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
        className="cursor-pointer rounded-full px-8 lg:flex lg:items-center lg:gap-2 lg:bg-slate-300 lg:py-2"
        onClick={openModal}
      >
        <Image
          src={data.user?.image as string}
          alt={`${data.user?.name} profile picture`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="hidden lg:block lg:font-bold">{data.user?.name}</span>
        <BsThreeDotsVertical className="hidden lg:block" size={"1.5rem"} />
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
