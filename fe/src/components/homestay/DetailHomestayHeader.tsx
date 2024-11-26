import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export const DetailHomestayHeader = ({id}:{id:string}) => {
  return (
    <header className="capitalize justify-between flex items-center">
      <div className="grow text-center text-lg">
        <h4>rumah gadang information </h4>
      </div>
      <Link className="btn-fill-primary" href={`./${id}/edit`}>
        <FaPencil /> edit
      </Link>
    </header>
  );
};
