"use client";
import { getCentroid } from "@/utils/common/getCentroid";
import MapLayout from "../web/MapLayout";
import ReservationHomestayMap from "./ReservationHomestayMap";
import ReservationInfo from "./ReservationInfo";
import useDetailHomestayReservation from "@/hooks/useDetailHomestayReservation";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import DetailHomestayReservationLoader from "../loading/DetailHomestayReservationloader";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import { formatPrice } from "@/lib/priceFormatter";
import Button from "../common/Button";
import { FaEnvelope, FaPrint, FaXmark } from "react-icons/fa6";
import ReservationStep from "../reservation/ReservationStep";
import { ReservationDetails } from "@/type/schema/ReservationSchema";
import { Modal } from "../modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { confirmationSchema } from "@/validation/reservation";
import { FormInput } from "../inputs/FormInput";
import { ReservationStatus } from "@/utils/common/getReservationStatus";

const DetailHomestayReservation = ({ id }: { id: string }) => {
  const {
    data,
    geom,
    isLoading,
    homestayInfo,
    detail,
    isFetching,
    refetch,
    isAdmin,
    isOpen,
    toggle,
    initialValues,
    handleSubmit,
    isPending,
    status,
    handlePayment,
  } = useDetailHomestayReservation(id);
  const centroid = getCentroid(geom);
  if (isLoading) return <DetailHomestayReservationLoader />;
  return (
    data &&
    detail &&
    homestayInfo && (
      <section className=" space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReservationInfo
            homestayInfo={homestayInfo}
            data={data}
            status={status.replaceAll(" ", "-") as ReservationStatus}
            handlePayment={handlePayment}
          />

          <SingleContentWrapper className="h-[700px] md:h-full">
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-secondary  mb-6">
                Google Maps
              </h2>
            </header>
            <MapLayout
              containerStyle={{ width: "100%", height: "90%" }}
              zoom={18}
              center={centroid}
            >
              <ReservationHomestayMap geom={geom} />
            </MapLayout>
          </SingleContentWrapper>
        </div>
        <SingleContentWrapper className="md:col-span-2">
          <header className="mb-8">
            <h2 className="text-2xl  text-center font-bold text-secondary  mb-6">
              List Transaction
            </h2>
          </header>
          <table
            className="w-full [&_thead]:bg-gray-800 [&_thead]:text-white [&_td]:p-2 [&_th]:p-2  "
            role="table"
            aria-describedby="reservation-summary"
          >
            <TableHeaderManagement
              action={false}
              headers={["date", "Description", "unit_type", "Unit Price"]}
            />

            <tbody className="bg-gray-50 [&_td]:p-4 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-center">
              {detail?.length > 0 &&
                detail?.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-center">{detail.date} </td>
                    <td className="!text-left">
                      <div>
                        <div className="font-medium">
                          {detail?.homestay?.unit_name}
                        </div>
                        <div className="text-sm text">
                          {detail?.homestay?.description}
                        </div>
                      </div>
                    </td>
                    <td>{detail?.homestay?.unitType?.name_type}</td>
                    <td>{formatPrice(detail?.homestay?.price)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={3}></td>

                <td className="text-center">Grand Total</td>
                <td className="text-center">
                  {formatPrice(
                    parseInt((data.total_price as unknown as string) || "0")
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </SingleContentWrapper>

        <SingleContentWrapper className="md:col-span-2">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-secondary  mb-6">
              Reservation Summary
            </h2>
          </header>
          <section className="h-fit">
            {((isAdmin && status === "Rejected") ||
              status.replaceAll(" ", "-") === "Awaiting-Approval") && (
              <Button onClick={toggle}>
                <FaEnvelope />
                Confirmation
              </Button>
            )}
          </section>
          <div className="[&_dt]:min-w-[12.5rem] border-b-2 p-4 space-y-4 ">
            <dl className="flex  items-center">
              <dt className="font-semibold">Total Price</dt>
              <dd>: {formatPrice(data.total_price)}</dd>
            </dl>
            <dl className="flex  items-center">
              <dt className="font-semibold">Deposit</dt>
              <dd>: {formatPrice(data.deposit)} </dd>
            </dl>
          </div>
          <dl className="flex [&_dt]:min-w-[12.5rem] p-4 items-center">
            {data && (
              <ReservationStep reservation={data as ReservationDetails} />
            )}
          </dl>
          <section className="flex p-4 gap-4 items-center justify-end">
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              variant={"success"}
            >
              <FaPrint /> Invoice
            </Button>
            <Button variant={"danger"}>
              <FaXmark /> Cancel
            </Button>
          </section>
        </SingleContentWrapper>
        <Modal title="Confirmation" isOpen={isOpen} onClose={toggle}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={confirmationSchema}
          >
            <Form className="space-y-4 p-4">
              <h2 className="text-lg font-bold">Status Confirmation</h2>
              <div className="flex gap-4 items-center [&_label]:border-2 [&_label]:p-2 [&_label]:rounded-full [&_label]:gap-2 [&_label]:items-center [&_label]:flex">
                <label>
                  <Field type="radio" name="status" value="2" />
                  Rejected
                </label>
                <label>
                  <Field type="radio" name="status" value="1" />
                  Accepted
                </label>
              </div>
              <ErrorMessage
                name="status"
                component="p"
                className="text-red-600"
              />
              <FormInput
                as="textarea"
                name="feedback"
                label="Feedback"
                rows={4}
                placeholder="Leave your feedback here..."
              />

              <Button
                disabled={isPending}
                isLoading={isPending}
                className="h-fit py-1"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Modal>
      </section>
    )
  );
};
export default DetailHomestayReservation;
