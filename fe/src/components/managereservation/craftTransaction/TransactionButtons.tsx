import ButtonTooltip from "@/components/common/ButtonTooltip";
import useUserRole from "@/hooks/useUserRole";
import { HiOutlineCube } from "react-icons/hi2";
//1
//export const getCraftTransactionStatus = (status: number) => {
//   switch (status) {
//     case 0:
//       return "Not ordered";
//     case 1:
//       return "Awaiting payment";
//     case 2:
//       return "Processing";
//     case 3:
//       return "On the way";
//     case 4:
//       return "Completed";
//     case 5:
//       return "Rated";
//     case 6:
//       return "Cancelled";
//     default:
//       return "Unknown";
//   }
// };
type Props = {
  handleShipProducts: () => void;
  status: number;
  token?: string;
  rated: boolean;
};
const TransactionButtons = ({ handleShipProducts, status }: Props) => {
  const { isAdmin } = useUserRole();

  switch (status) {
    case 1:
      return;
    case 2:
      return !isAdmin ? (
        <>
          <ButtonTooltip
            onClick={() => handleShipProducts()}
            variant={"regSuccess"}
            label="Mark as Ready to Ship"
          >
            <HiOutlineCube />
          </ButtonTooltip>
        </>
      ) : null;
    case 3:
      return <></>;
    case 4:
      return <></>;
    case 5:
      return <></>;
    case 6:
      return <>{/* (Opsional) */}</>;
    default:
      return null;
  }
};

export default TransactionButtons;
