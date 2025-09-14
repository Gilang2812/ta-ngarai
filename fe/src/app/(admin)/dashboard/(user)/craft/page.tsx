"use client";
import ManagementFooter from "@/components/admin/ManagementFooter";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import TableManagementHeader from "@/components/admin/TableManagementHeader";
import Button from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { InfoButton } from "@/components/common/InfoButton";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import CraftManagementForm from "@/components/craft/CraftManagementForm";
import CraftManagementList from "@/components/craft/CraftManagementList";
import DetailCraftHeader from "@/components/craft/DetailCraftHeader";
import DetailCraftInfo from "@/components/craft/DetailCraftInfo";
import DetailCraftMainImage from "@/components/craft/DetailCraftMainImag";
import DetailCraftThubnails from "@/components/craft/DetailCraftThubnails";
import VariantManagementList from "@/components/craft/VariantManagementList";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import { InfoModal } from "@/components/modal/InfoModal";
import { Modal } from "@/components/modal/Modal";
import useManageAdminCraft from "@/hooks/useManageAdminCraft";
import { formatPrice } from "@/lib/priceFormatter";
import { craftSchema, craftVariantSchema } from "@/type/schema/CraftSchema";
import { Form, Formik } from "formik";
import React from "react";
import { FaCircleInfo, FaPlus } from "react-icons/fa6";

const ManageCraft = () => {
  const {
    isOpenForm,
    isOpenList,
    toggleList,
    handleVariantForm,
    formType,
    initialValues,
    handleSubmit,
    isPending,
    crafts,
    handleCraftForm,
    isLoading,
    handleDeleteVariant,
    handleEditCraft,
    updateCraftPending,
    isEditCraft,
    toggleEditCraft,
    handleDeleteCraft,
    toggleForm,
    view,
    setView,
    handleEditVariant,
    updateVariantPending,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    setSelectedDetailVariant,
    totalItems,
    handleSearch,
    searchTerm,
    selectedDetailVariant,
    selectedImg,
    setSelectedImg,
  } = useManageAdminCraft();
  const tableHeaders = ["name", "store", "price", "weight", "stock", "modal"];

  const RenderCraft = () => {
    if (currentItems?.length === 0) {
      return <EmptyState />;
    }
    return (
      <table className="[&_td]:text-wrap [&_tbody]:font-normal [&_td]:p-2 text-sm w-full">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {currentItems?.map((detail, index) => (
            <tr className="hover:bg-gray-100 transition-colors" key={index}>
              <td>{index + (indexOfFirstItem || 0) + 1}</td>
              <td> {` ${detail?.variant?.craft?.name || ''} ${detail?.variant?.name || ''}`}</td>
              <td>{detail?.souvenirPlace?.name || ''}</td>
              <td className="text-right">{formatPrice(detail?.price || 0)}</td>
              <td className="text-right">{detail?.weight || 0} gram</td>
              <td className="text-right">
                {detail?.stock?.toLocaleString() || 0} units
              </td>
              <td className="text-right">
                {detail?.modal ? formatPrice(detail.modal) : "-"}
              </td>
              <td>
                <div className="flex gap-2 items-center justify-center  ">
                  <InfoButton
                    onClick={() =>{ setSelectedDetailVariant?.(detail); setSelectedImg?.(detail?.craftGalleries?.[0]?.url || "");}}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    crafts && (
      <SingleContentWrapper>
        <div className=" flex items-start gap-2 w-full [&_header]:grow">
          <ManagementHeader
            content="craft variant"
            title="Management Craft"
            onCreateClick={handleVariantForm}
          />
          <Button
            onClick={handleCraftForm}
            type="button"
            text="new Craft "
            Icon={FaPlus}
          />

          <Button
            className="p-2"
            variant={"primary"}
            onClick={toggleList}
            type="button"
          >
            <FaCircleInfo /> Craft Info
          </Button>
        </div>
        <section>
          <TableManagementHeader
            handleItemsPerPage={handleItemsPerPage}
            handleSearch={handleSearch}
            itemsPerPage={itemsPerPage || 10}
            searchTerm={searchTerm || ''}
          />
          <RenderCraft />
          <ManagementFooter
            currentPage={currentPage || 1}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            indexOfFirstItem={indexOfFirstItem || 0}
            indexOfLastItem={indexOfLastItem || 0}
            totalItems={totalItems || 0}
            totalPages={totalPages || 1}
          />
        </section>
        <Modal
          title={`Create ${formType || ''}`}
          isOpen={isOpenForm || false}
          onClose={toggleForm}
        >
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues || {}}
            validationSchema={
              formType === "variant" ? craftVariantSchema : craftSchema
            }
            enableReinitialize
          >
            <Form className="space-y-2   ">
              <CraftManagementForm crafts={crafts} formType={formType} />
              <Button isLoading={isPending || false} disabled={isPending || false} type="submit">
                submit
              </Button>
            </Form>
          </Formik>
        </Modal>

        <InfoModal title="Craft List" isOpen={isOpenList || false} onClose={toggleList}>
          <ViewToggleButtons
            current={view || 'craft'}
            onChange={setView}
            views={["craft", "variant"]}
          />
          {view === "craft" ? (
            <CraftManagementList
              handleCraftForm={handleCraftForm}
              crafts={crafts}
              isLoading={isLoading }
              isEditCraft={isEditCraft }
              updateCraftPending={updateCraftPending }
              toggleEditCraft={toggleEditCraft}
              handleDeleteCraft={handleDeleteCraft}
              handleEditCraft={handleEditCraft}
            />
          ) : (
            <VariantManagementList
              crafts={crafts}
              handleVariantForm={handleVariantForm}
              isLoading={isLoading }
              isEditCraft={isEditCraft }
              updateVariantPending={updateVariantPending }
              toggleEditCraft={toggleEditCraft}
              handleDeleteVariant={handleDeleteVariant}
              handleEditVariant={handleEditVariant}
            />
          )}
        </InfoModal>
        <InfoModal
          onClose={() => setSelectedDetailVariant?.(null)}
          isOpen={!!selectedDetailVariant}
          title={`${
            !selectedDetailVariant
              ? "detail "
              : `${selectedDetailVariant?.variant?.craft?.name || ''} ${selectedDetailVariant?.variant?.name || ''}`
          }`}
        >
          {selectedDetailVariant && (
            <section className="rounded-3xl overflow-hidden">
              <DetailCraftHeader />
              <section className="p-10 grid lg:grid-cols-2 gap-10">
                <article className=" space-y-6">
                  <DetailCraftMainImage
                    selectedImg={selectedImg || ''}
                    imgCount={selectedDetailVariant?.craftGalleries?.length || 0}
                  />
                  <DetailCraftThubnails
                    selectedImg={selectedImg || ''}
                    setSelectedImg={setSelectedImg}
                    data={selectedDetailVariant?.craftGalleries || []}
                  />
                </article>
                <DetailCraftInfo data={selectedDetailVariant} />
              </section>
            </section>
          )}
        </InfoModal>
      </SingleContentWrapper>
    )
  );
};

export default ManageCraft;
