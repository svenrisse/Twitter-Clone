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
    <div className="fixed lg:bottom-4">
      <div
        onClick={openModal}
        className="w-10 cursor-pointer rounded-full lg:flex lg:w-40 lg:items-center lg:gap-2 lg:bg-slate-300 lg:py-2"
      >
        <Image
          src={data.user?.image as string}
          alt={`${data.user?.name} profile picture`}
          width={0}
          height={0}
          sizes="100vw"
          className="ml-4 w-12 rounded-full md:w-10 lg:ml-2"
        />
        <span className="hidden text-center text-xs lg:block lg:font-semibold">
          {data.user?.name}
        </span>
        <BsThreeDotsVertical
          className="hidden rounded-xl py-1 lg:mr-2 lg:block"
          size={"1.5rem"}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-x-0 top-1/2 mx-auto flex w-2/3 flex-col items-center rounded-lg border-0 bg-slate-300 py-8 lg:left-28 lg:bottom-24 2xl:left-96"
      >
        <h2 className="mb-5 font-bold">Do you want to logout?</h2>
        <div>
          <button
            className="mr-5 w-20 rounded-xl bg-cyan-700 py-2 font-bold text-white"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            className="w-20 rounded-xl bg-red-500 py-2 font-bold text-white"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </Modal>
    </div>
  );
}
