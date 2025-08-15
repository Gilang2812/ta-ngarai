import { ROUTES } from "@/data/routes";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import Button from "../common/Button";

export const DetailHomestayHeader = ({ id }: { id: string }) => {
  return (
    <header className="capitalize justify-between flex items-center">
      <div className="grow text-center text-lg">
        <h4>rumah gadang information </h4>
      </div>
      <Button asChild>
        <Link href={ROUTES.EDIT_HOMESTAY(id)}>
          <FaPencil /> edit
        </Link>
      </Button>
    </header>
  );
};
