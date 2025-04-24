import React from "react";
import Button from "./Button";
import { FaCircleXmark, FaCompass } from "react-icons/fa6";

export const ButtonSearchArround = ({
  search,
  onClick,
}: {
  search: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant={"primary"}
      onClick={onClick}
      text={`${search ? "close" : "explore around"}`}
      Icon={search ? FaCircleXmark : FaCompass}
    />
  );
};
