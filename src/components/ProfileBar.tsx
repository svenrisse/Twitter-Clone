import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";

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
    <div className="fixed bottom-6 left-14  ">
      <div
        className="flex w-48 cursor-pointer items-center justify-between rounded-xl border-2 border-black bg-slate-300 px-4 py-2"
        onClick={openModal}
      >
        <Image
          src={data.user?.image as string}
          alt={`${data.user?.name} profile picture`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="px-4 font-bold">{data.user?.name}</span>
        <BsThreeDotsVertical size={"1.5rem"} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed bottom-24 left-14"
      >
        <button className="w-40 bg-cyan-500 py-2" onClick={() => signOut()}>
          Logout
        </button>
      </Modal>
    </div>
  );
}
