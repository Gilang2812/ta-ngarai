"use client";
import { AddressForm } from "@/components/checkout/AddressForm";
import AddressSelector from "@/components/checkout/AddressSelector";
import EmptyAddress from "@/components/checkout/EmptyAddress";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";
import { InfoModal } from "@/components/modal/InfoModal";
import { ROUTES } from "@/data/routes";
import useProfile from "@/hooks/useProfile";
import { addressFormSchema } from "@/type/schema/CheckoutSchema";
import { cn } from "@/utils/common/cn";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default function Profile() {
  const {
    profile,
    isLoading,
    addresses,
    isOpen,
    toggleModal,
    addressInitialValues,
    showAddressForm,
    selectedAddress,
    handleSaveAddress,
    handleCancelAddressForm,
    handleSelectAddress,
    handleAddNewAddress,
    handleEditAddress,
    isPending,
  } = useProfile();

  if (isLoading) return <ProfileSkeleton />;
  return (
    <SingleContentWrapper className="relative mx-auto overflow-x-hidden">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <Button asChild aria-label="Edit profile information">
          <Link href={ROUTES.UPDATE_PROFILE}>Edit Profile</Link>
        </Button>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-labelledby="profile-info">
          <h2 id="profile-info" className="sr-only">
            Profile Information
          </h2>

          <div className="space-y-8">
            {profile.map((item, index) => (
              <dl key={index}>
                <dt className=" flex items-center capitalize font-semibold leading-loose">
                  {item.label}
                  {item.label === "address" && (
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={toggleModal}
                    >
                      <FaPencil className="bg-white rounded" />
                    </button>
                  )}
                </dt>
                <dd
                  className={cn(
                    "text-lg", (item.label==="address"&&"text-sm font-medium capitalize "),
                    ((item.label === "address" && addresses?.length === 0) ||
                      item.isEmpty) &&
                      "font-medium italic text-yellow-300"
                  )}
                >
                  {item.values?.toLocaleLowerCase()}
                </dd>
              </dl>
            ))}
          </div>
        </section>
        <section aria-labelledby="profile-picture">
          <h2 id="profile-picture" className="capitalize  font-semibold mb-8">
            Profile Picture
          </h2>

          <div className="flex">
            <div className="relative">
              <div className="size-52 rounded-full flex items-center justify-center shadow-lg">
                <Image
                  src="/images/profile.png"
                  alt="Profile Picture"
                  layout="fill"
                  className="rounded-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <InfoModal title="address" isOpen={isOpen} onClose={toggleModal}>
        {addresses &&
          (showAddressForm ? (
            <Formik
              initialValues={addressInitialValues}
              enableReinitialize
              onSubmit={handleSaveAddress}
              validationSchema={addressFormSchema}
            >
              <AddressForm
                onSave={handleSaveAddress}
                addressInitialValues={addressInitialValues}
                onCancel={handleCancelAddressForm}
                isPending={isPending}
              />
            </Formik>
          ) : addresses.length === 0 ? (
            <EmptyAddress onAdd={handleAddNewAddress} />
          ) : (
            <AddressSelector
              addresses={addresses}
              onAddNewAddress={handleAddNewAddress}
              onEditAddress={handleEditAddress}
              selectedAddressId={selectedAddress?.address_id}
              onSelectAddress={handleSelectAddress}
            />
          ))}
      </InfoModal>
    </SingleContentWrapper>
  );
}
