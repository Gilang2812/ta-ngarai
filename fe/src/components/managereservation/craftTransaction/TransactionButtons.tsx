import Button from "@/components/common/Button";
import ButtonTooltip from "@/components/common/ButtonTooltip"; 
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
};
const TransactionButtons = ({ handleShipProducts, status }: Props) => {
  switch (status) {
    case 1:
      return (
        <>
          <Button variant="secondary" disabled>
            awaiting Payment
          </Button>
        </>
      );
    case 2:
      return (
        <>
          <ButtonTooltip
            onClick={() => handleShipProducts()}
            variant={"regSuccess"}
            label="Mark as Ready to Ship"
          >
            <HiOutlineCube />
          </ButtonTooltip>
        </>
      );
    case 3:
      return <></>;
    case 4:
      return <></>;
    case 5:
      return <></>;
    case 6:
      return (
        <>
          {/* (Opsional) */} 
        </>
      );
    default:
      return null;
  }
};

export default TransactionButtons;
