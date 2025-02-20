import React, { FC } from "react";
import { FaInfo } from "react-icons/fa6";
import { InfoModal } from "../modal/InfoModal";
import { useModal } from "@/utils/ModalUtils";
type GuideProps = {
  handleCheck: (e:React.ChangeEvent<HTMLInputElement>)=>void
}
export const Guide:FC<GuideProps> = ({handleCheck}) => {
  const { closeModal, isOpen, openModal } = useModal();
  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="btn btn-danger italic text-sm "
      >
        <FaInfo />
        Read this guide
      </button>
      <label htmlFor="guide">
        <input
          type="checkbox"
          id="guide"
          name="guide"
          onChange={handleCheck}
          className="outline-none rounded-sm h-3 w-3 focus:outline-transparent focus:border-primary focus:hover:text-secondary focus:text-primary  focus:ring-transparent"
        />
        <span className="ml-2 text-gray-700">I have read this guide</span>
      </label>
      <InfoModal isOpen={isOpen} onClose={closeModal} title="reservation guide">
        <p>guiide</p>
      </InfoModal>
    </>
  );
};
