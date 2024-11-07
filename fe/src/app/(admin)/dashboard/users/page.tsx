/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCircleInfo, FaTrash, FaPlus } from "react-icons/fa6";
import { useModal } from "@/utils/ModalUtils";
import { Form, Formik } from "formik";
import { Spinner } from "@/components/loading/Spinner";
import { useFetchUsers } from "@/features/dashboard/users/useFetchUser";
import { confirmDeleteAlert, showCreateAlert, showDeleteAlert } from "@/utils/AlertUtils";
import Image from "next/image";
import { AuthGroupUser, createUserSchema } from "@/validation/usersSchema";
import { useCreateUser } from "@/features/dashboard/users/useCreateUser";
import { useDeleteUser } from "@/features/dashboard/users/useDeleteUser";
import { Modal } from "@/components/modal/Modal";
import { FormInput } from "@/components/inputs/FormInput";
import { RawSkeleton } from "@/components/loading/RawSkeleton";
import { InfoModal } from "@/components/modal/InfoModal";

export default function ManageUsers() {
  const [errorInput, setErrorInput] = useState<{ [key: string]: string }>({});
  const [selectedUser, setSelectedUser] = useState<AuthGroupUser | null>(null);

  const {
    isOpen: isModalInputOpen,
    closeModal: closeModalInput,
    openModal: openModalInput,
  } = useModal();
  const {
    isOpen: isModalInfoOpen,
    closeModal: closeModalInfo,
    openModal: openModalInfo,
  } = useModal();

  const [activeTab, setActiveTab] = useState("admin");

  const {
    data,
    isLoading: userIsLoading,
    refetch: refetchUser,
  } = useFetchUsers();

  const { mutate: createUser, isPending: createProdukLoading } = useCreateUser({
    onSuccess: () => {
      refetchUser();
      showCreateAlert("user");
      closeModalInput();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data || ["Terjadi kesalahan"];
      setErrorInput(errorMessage);
    },
  });

  const { mutate: deleteUser, isError } = useDeleteUser({
    onSuccess: () => {
      console.log(isError);
      showDeleteAlert("user");
      refetchUser();
    },
    onError: (error: any) => {
      console.error("Error deleting user:", error);
    },
  });

  const handleOpenDeleteModal = (user: any) => {
    confirmDeleteAlert("user", user?.user?.username, () =>
      deleteUser({ userId: user?.user_id, groupId: user?.group_id })
    );
  };
  const handleOpenInfoModal = (user: any) => {
    setSelectedUser(user);
    openModalInfo();
  };

  const adminData = data?.filter((user: any) => user.group_id !== 2) || [];
  const customerData = data?.filter((user: any) => user.group_id === 2) || [];
  const tableBody = activeTab === "admin" ? adminData : customerData;

  const RenderUser = () => {
    return tableBody.map((user: any, index: number) => (
      <tr className="border-b" key={user.user_id}>
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{user.user_id}</td>
        <td className="p-2">{user?.user?.username}</td>
        <td className="p-2">{user?.user?.fullname}</td>
        <td className="p-2">{user?.user?.email}</td>
        <td className="flex justify-center gap-2 p-2">
          <button
            onClick={() => handleOpenInfoModal(user)}
            className="p-2 transition duration-300 ease-in-out bg-white border rounded border-primary text-primary hover:bg-primary hover:text-white"
            aria-label="View Details"
          >
            <FaCircleInfo />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(user)}
            className="p-2 text-red-600 transition duration-300 ease-in-out bg-white border border-red-600 rounded hover:bg-red-600 hover:text-white"
            aria-label="Delete"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));
  };

  const isSSR = typeof window === "undefined";

  return (
    <section
      className="p-5 bg-white rounded-xl"
      suppressHydrationWarning={true}
    >
      <h1 className="mb-4 text-lg font-bold">Manage Users</h1>

      <header className="flex mb-4 border-b">
        {["admin", "customer"].map((tab) => (
          <motion.button
            key={tab}
            className={`px-4 py-2 relative ${
              activeTab === tab ? "bg-primary/5 text-primary" : "text-primary"
            }`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ color: "#2d499d" }}
          >
            {tab === "admin" ? "Admin Account" : "Customer Account"}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary"
              />
            )}
          </motion.button>
        ))}
      </header>
      {userIsLoading && (
          <RawSkeleton
            tableHead={["#", "ID", "Username", "Fullname", "Email", "Action"]}
          />
        ) }
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === "admin" && (
          <button
            onClick={openModalInput}
            className="flex items-center gap-2 p-2 px-3 mb-5 font-normal text-white rounded bg-primary hover:bg-customBg"
            type="button"
          >
            <FaPlus /> New Admin
          </button>
        )}

          <table className="w-full">
            <thead>
              <tr className="border-b-2">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-left">Fullname</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <RenderUser />
            </tbody>
          </table>
      
      </motion.div>
 
      <Modal
        isOpen={isModalInputOpen}
        onClose={closeModalInput}
        title="New Admin Registration"
      >
        <Formik
          initialValues={{ username: "", email: "" }}
          validationSchema={createUserSchema}
          onSubmit={async (values) => {
            await createUser(values);
            closeModalInput();
            refetchUser();
          }}
        >
          <Form className="mt-2 space-y-2 font-normal leading-loose capitalize">
            <div>
              
              <FormInput label="username" type="text" name="username" />
            </div>
            <div>
            
              <FormInput label="email" type="text" name="email" />
            </div>
            <div>
              <button
                className="flex justify-center px-3 font-normal text-white capitalize transition duration-300 ease-in-out rounded bg-primary hover:bg-customBg disabled:bg-gray-500"
                type="submit"
                disabled={createProdukLoading}
              >
                {createProdukLoading ? <Spinner /> : "Register Admin"}
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
      <InfoModal 
        isOpen={isModalInfoOpen}
        onClose={closeModalInfo}
        title="User Details"
      
      >
        <section className="grid grid-cols-2">
          <center>
            <Image
              className="= size-60"
              src="/images/profile.png"
              alt="profile"
              width={500}
              height={500}
              loading="lazy"
              />
              </center>

          <div className=" self-auto pt-[1.5vh] leading-loose font-semibold [&_h1]:text-xl">
            <h1>{selectedUser?.user?.username}</h1>
            <p>{selectedUser?.user?.fullname??'(Belum dilengkapi)'}</p>
            <p>Email : {selectedUser?.user?.email}</p>
            <p>Adress: {selectedUser?.user?.address??'(Belum dilengkapi)'}</p>
            <p>Phone: {selectedUser?.user?.phone??'(Belum dilengkapi)'}</p>
          </div>
        </section>
      </InfoModal>
    </section>
  );
}
