import React, { FC } from "react";
import { FaInfo } from "react-icons/fa6";
import { InfoModal } from "../modal/InfoModal";
import { useModal } from "@/utils/ModalUtils";

type GuideProps = {
  isLastStep: boolean
  handleCheck: (e:React.ChangeEvent<HTMLInputElement>)=>void
}

export const Guide:FC<GuideProps> = ({handleCheck,isLastStep}) => {

  const { toggleModal, isOpen,} = useModal();

  return (
    <>
      <button
        onClick={toggleModal}
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
          disabled = {isLastStep}
          className="outline-none rounded-sm h-3 w-3 focus:outline-transparent focus:border-primary focus:hover:text-secondary focus:text-primary  focus:ring-transparent"
        />
        <span className="ml-2 text-gray-700">I have read this guide</span>
      </label>
      <InfoModal isOpen={isOpen} onClose={toggleModal} title="">
        <p>guiide</p>
      </InfoModal>
    </>
  );
};
