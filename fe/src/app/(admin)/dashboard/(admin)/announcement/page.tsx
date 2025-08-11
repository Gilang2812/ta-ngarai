"use client";

import AnnouncementHeader from "@/components/announcement/AnnouncementHeader";
import AnnouncementTable from "@/components/announcement/AnnouncementTable";
import CreateButton from "@/components/announcement/CreateButton";
import TableRow from "@/components/announcement/TableRow";
import Button from "@/components/common/Button";
import { FormInput } from "@/components/inputs/FormInput";
import { RawSkeleton } from "@/components/loading/RawSkeleton";
import { InfoModal } from "@/components/modal/InfoModal";
import { Modal } from "@/components/modal/Modal";
import { useCreateAnnouncement } from "@/features/dashboard/announcement/useCreateAnnouncement";
import { useDeleteAnnouncement } from "@/features/dashboard/announcement/useDeleteAnnouncement";
import { useEditAnnouncement } from "@/features/dashboard/announcement/useEditAnnouncement";
import { useFetchAnnouncements } from "@/features/web/useFetchAnnouncement";

import { AnnouncementSchema } from "@/type/schema/AnnouncementSchema";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils"; 
import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  id: yup.string().required("ID is required").max(5),
  announcement: yup.string().required("Announcement is required"),
  status: yup.number().required("Selected the announcement status"),
});

export default function Announcement() {
  const [status, setStatus] = useState(1);

  const [selectedData, setSelectedData] = useState<AnnouncementSchema | null>(
    null
  );
  const { data, isLoading, refetch } = useFetchAnnouncements();

  const { isOpen: inputModal, toggleModal: toggleInputModal } = useModal();
  const { isOpen: infoModal, toggleModal: toggleInfoModal } = useModal();

  const { mutate, isPending } = useCreateAnnouncement({
    onSuccess: () => {
      cornerAlert("create announcement ");
      toggleInputModal();
      refetch();
    },
  });

  const { mutate: editMutate, isPending: editPending } = useEditAnnouncement({
    onSuccess: () => {
      toggleInputModal();
      cornerAlert("edit announcement ");
      refetch();
    },
  });

  const { mutate: deleteMutate } = useDeleteAnnouncement({
    onSuccess: () => {
      cornerAlert("delete announcement ");
      refetch();
    },
  });
  const handleCreate = async (values: AnnouncementSchema) => {
    mutate(values);
  };

  const handleEdit = async (values: AnnouncementSchema) => {
    await editMutate(values);
  };

  const handleDelete = async (id: string) => {
    await confirmDeleteAlert("announcement", id, () => deleteMutate(id));
  };
  const handleStatusChange = (
    value: number,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    setStatus(value);
    setFieldValue("status", value);
  };

  const handleOpenModalInput = () => {
    toggleInputModal();
  };

  const handleOpenModalInfo = (data: AnnouncementSchema) => {
    setSelectedData(data);
    toggleInfoModal();
  };

  const handleOpenModalEdit = (data: AnnouncementSchema) => {
    setSelectedData(data);
    setStatus(data.status);
    toggleInputModal();
  };

  return (
    <main className="p-5 space-y-5 bg-white rounded-xl">
      <AnnouncementHeader />

      <section className="py-6 space-y-8">
        <CreateButton onClick={handleOpenModalInput} />
        <AnnouncementTable>
          <tbody role="rowgroup">
            {!isLoading &&
              data?.map((data: AnnouncementSchema, index: number) => (
                <TableRow
                  key={index}
                  onInfoClick={() => handleOpenModalInfo(data)}
                  onEditClick={() => handleOpenModalEdit(data)}
                  onDeleteClick={() => handleDelete(data.id)}
                  data={data}
                  index={index + 1}
                />
              ))}
          </tbody>
        </AnnouncementTable>
        {isLoading && <RawSkeleton />}
      </section>

      <Modal
        title={selectedData ? "Edit Announcement" : "New Announcement"}
        isOpen={inputModal}
        onClose={() => {
          toggleInputModal();
          setSelectedData(null);
        }}
      >
        <Formik
          initialValues={{
            id: selectedData?.id || "",
            announcement: selectedData?.announcement || "",
            status: selectedData?.status || 1,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (selectedData) {
              await handleEdit(values);
            } else {
              await handleCreate(values);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="leading-loose space-y-2">
              <div>
                <FormInput
                  label="ID"
                  name="id"
                  type="text"
                  readonly={!!selectedData}
                />
              </div>
              <div>
                <FormInput
                  as="textarea"
                  rows={4}
                  label="Announcement"
                  name="announcement"
                  type="text"
                />
              </div>
              <div className="space-y-2 my-4 leading-loose ">
                <label className="font-semibold">Status</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={1}
                      checked={status === 1}
                      onChange={() => handleStatusChange(1, setFieldValue)}
                      className="form-radio text-primary"
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={2}
                      checked={status === 2}
                      onChange={() => handleStatusChange(2, setFieldValue)}
                      className="form-radio text-gray-300"
                    />
                    <span>Non Active</span>
                  </label>
                  <ErrorMessage
                    name="status"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <Button
                type="submit"
                isLoading={isLoading || isPending}
                disabled={isPending || editPending}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <InfoModal
        isOpen={infoModal}
        onClose={() => {
          toggleInfoModal();
          setSelectedData(null);
        }}
      >
        <table className="table-fixed my-4">
          <tbody>
            <tr className="border-b [&_td]:p-2">
              <td>ID</td>
              <td>{selectedData?.id}</td>
            </tr>
            <tr className="border-b [&_td]:p-2">
              <td>Announcement</td>
              <td>{selectedData?.announcement}</td>
            </tr>
            <tr className="border-b [&_td]:p-2 text-sm">
              <td>Status</td>
              <td>
                {selectedData?.status == 1 ? (
                  <p className="px-2 py-1 bg-green-500 rounded">active</p>
                ) : (
                  <p className="px-2 py-1 bg-red-600 rounded">non active</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </InfoModal>
    </main>
  );
}
