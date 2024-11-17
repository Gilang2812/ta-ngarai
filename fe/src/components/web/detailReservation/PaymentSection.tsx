import { SetStatus } from "@/components/reservation/SetStatus";
import { ReservationSchema } from "@/type/schema/reservationSchema";
import { FaDownload, FaMoneyBill1 } from "react-icons/fa6";

export const PaymentSection = ({data}:{data:ReservationSchema}) => {
  return (
    <div className="bg-white p-5 rounded-lg   space-y-4">
      <header className="text-lg text-center    ">
        <h2>Payment</h2>
      </header>
      <section className="capitalize flex items-center  ">
        <button className="btn btn-regsuccess">
          <FaDownload /> Download Invoice
        </button>
        <button className="btn text-cyan-400 bg-white border-cyan-400 px-3 py-2 hover hover:bg-cyan-400 hover:text-black">
          <FaMoneyBill1 /> Proof of Deposit
        </button>
      </section>
      <table className="w-full table-fixed [&_td]:py-1 ">  
        <tbody>
            <tr>
                <td>Total Reservation</td>
                <td>:</td>
            </tr>
            <tr className="border-b">
                <td>Deposit Reservation</td>
                <td>:</td>
            </tr>
            <tr>
                <td>Status</td>
                <td>{<SetStatus s={data.status} c={data.cancel} r={data.refund_check}/>}</td>
            </tr>
            <tr>
                <td>Confirm Date</td>
                <td>:</td>
            </tr>
            <tr>
                <td>Feedback admin about reservation</td>
                <td>:</td>
            </tr>
            <tr>
                <td>deposit payment</td>
                <td>: {data.deposit}</td>
            </tr>
            <tr>
                <td>Status deposin paymeny</td>
                <td>:</td>
            </tr>
        </tbody>
      </table>
 
    </div>
  );
};
