import { ROUTES } from "@/data/routes";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import Button from "../common/Button";
import useAuth from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export const DetailHomestayHeader = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <header className="capitalize justify-between flex items-center">
      <div className="grow text-center text-lg">
        <h4>Homestay Information </h4>
      </div>
      {pathname.startsWith('/dashboard') && user && Number(user?.role) === 2 && (
        <Button asChild>
          <Link href={ROUTES.EDIT_HOMESTAY(id)}>
            <FaPencil /> edit
          </Link>
        </Button>
      )}
    </header>
  );
};
