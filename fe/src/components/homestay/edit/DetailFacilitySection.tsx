import { FormInput } from "@/components/inputs/FormInput";
import { Modal } from "@/components/modal/Modal";
import { useCreateDetailHomestayFacility } from "@/features/dashboard/facility/useCreateDetailHomestayFacility";
import { useCreateHomestayFacility } from "@/features/dashboard/facility/useCreateHomestayFacility";
import { useDeleteDetailHomestayFacility } from "@/features/dashboard/facility/useDeleteDetailHomestayFacility";
import { useFetchHomestayFacilities } from "@/features/dashboard/facility/useFetchHomestayFacilities";
import { FetchHomestayProps } from "@/features/dashboard/homestay/useGetHomestay";
import {
  confirmDeleteAlert,
  showCreateAlert,
  showDeleteAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import {
  CreateDetailFacilityHomestaySchema,
  CreateFacilityHomestaySchema,
  DeleteDetailFacilitySchema,
} from "@/validation/facilitySchema";
import { Form, Formik } from "formik";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

type DetailFacilityProps = {
  id: string;
  refetchHomestay: () => void;
  dataHomestay: FetchHomestayProps;
};

export const DetailFacilitySection = ({
  id,
  refetchHomestay,
  dataHomestay,
}: DetailFacilityProps) => {
  const {
    isOpen: openFacility,
    closeModal: closeFacility,
    openModal: createFacility,
  } = useModal();
  const {
    isOpen: openDetailFacility,
    closeModal: closeDetailFacility,
    openModal: createDetailFacility,
  } = useModal();
  const { data, refetch } = useFetchHomestayFacilities();

  const facilityInitialValues = {
    name: "",
  };
  const deatailFacilityInitialValues = {
    homestay_id: id,
    facility_homestay_id: "",
    description: "",
  };

  const { mutate: createHomestayFacility } = useCreateHomestayFacility({
    onSuccess: async () => {
      showCreateAlert("facility");
      closeFacility();
      refetch();
    },
  });

  const { mutate: createDetailHF } = useCreateDetailHomestayFacility({
    onSuccess: () => {
      showCreateAlert("facility detail");
      closeDetailFacility();
      refetchHomestay();
    },
  });
  const handleFacilitySubmit = (values: CreateFacilityHomestaySchema) => {
    createHomestayFacility(values);
  };
  const handleDetailFacilitySubmit = (
    values: CreateDetailFacilityHomestaySchema
  ) => {
    createDetailHF(values);
  };
  const { mutate: deleteDetailHomesty } = useDeleteDetailHomestayFacility({
    onSuccess: async () => {
      showDeleteAlert("facility detail deleted");
      refetchHomestay();
    },
  });
  const handleDeletedDetailHomestayFacility = (
    body: DeleteDetailFacilitySchema
  ) => {
    confirmDeleteAlert("Fasilitas", body.facility_homestay_id, () =>
      deleteDetailHomesty(body)
    );
  };
  return (
    <>
      <section className="bg-white rounde   d-xl p-4 space-y-4">
        <h4>Facility</h4>

        <div className="flex">
          <button
            type="button"
            onClick={createFacility}
            className="rounded-l border-y border-l border-primary font-normal hover:bg-primary hover:text-white transition-ease-in-out   text-primary flex gap-2 px-3 py-2 items-center "
          >
            <FaPlus /> New facility
          </button>
          <button
            onClick={createDetailFacility}
            type="button"
            className="rounded-r border border-cyan-400 font-normal text-cyan-400 hover:bg-cyan-400 hover:text-black transition-ease-in-out flex gap-2 px-3 py-2 items-center "
          >
            <FaPlus /> New facility Homestay
          </button>
        </div>
        <table className="w-full [&_tr]:border-b [&_td]:p-2 [&_th]:py-2 divide-y">
          <thead>
            <tr>
              <th>No</th>
              <th>Facility</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {dataHomestay?.details.map((d, i) => (
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>{d.facility.name}</td>
                <td>{d.description}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        handleDeletedDetailHomestayFacility({
                          homestay_id: id,
                          facility_homestay_id: d.facility_homestay_id,
                        })
                      }
                      type="button"
                      className="bg-red-600 font-normal rounded hover:bg-red-700 transition-ease-in-out p-2 text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal
        isOpen={openFacility}
        title="data facility "
        onClose={closeFacility}
      >
        <Formik
          initialValues={facilityInitialValues}
          onSubmit={handleFacilitySubmit}
        >
          {({ resetForm }) => (
            <Form className="space-y-6 ">
              <div className="space-y-4 px-4 leading-loose border-b pb-6">
                <FormInput
                  name="name"
                  type="text"
                  label="Facility Name"
                  required
                />
              </div>
              <div className="border-t flex justify-end items-center gap-2 py-4">
                <button
                  type="submit"
                  className="btn p-2 text-primary bg-white hover:bg-primary hover:text-white border-primary"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="btn p-2 text-red-600 bg-white hover:bg-red-800 hover:text-white border-red-600 "
                >
                  <FaTrashAlt />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modal
        isOpen={openDetailFacility}
        title="facility homestay"
        onClose={closeDetailFacility}
      >
        <Formik
          initialValues={deatailFacilityInitialValues}
          onSubmit={handleDetailFacilitySubmit}
        >
          {({ resetForm }) => (
            <Form className="space-y-6  ">
              <div className="space-y-4 leading-loose border-b pb-6">
                <FormInput
                  name="facility_homestay_id"
                  type="text"
                  label="Facility"
                  placeholder="facility"
                  as="select"
                  required
                >
                  {data?.map((hf, index) => (
                    <option key={index} value={hf.id}>
                      {hf.name}
                    </option>
                  ))}
                </FormInput>
                <FormInput
                  name="description"
                  type="text"
                  label="Description"
                  as="textarea"
                  placeholder="description"
                  required
                />
              </div>
              <div className="border-t flex justify-end items-center gap-2 py-4">
                <button
                  type="submit"
                  className="btn p-2 text-primary bg-white hover:bg-primary hover:text-white border-primary"
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="btn p-2 text-red-600 bg-white hover:bg-red-800 hover:text-white border-red-600 "
                >
                  <FaTrashAlt />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
