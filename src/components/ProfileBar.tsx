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
    <div>
      <div
        className="cursor-pointer rounded-full border-2 border-black bg-slate-400 p-1.5"
        onClick={openModal}
      >
        <Image
          src={data.user?.image as string}
          alt={`${data.user?.name} profile picture`}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed bottom-20 left-2 border-0"
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
