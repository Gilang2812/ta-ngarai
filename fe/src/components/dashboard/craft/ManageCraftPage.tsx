"use client";

import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import Button from "@/components/common/Button";
import { DeleteButton } from "@/components/common/DeleteButton";
import { InfoButton } from "@/components/common/InfoButton";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { Modal } from "@/components/modal/Modal";
import { useCraftManagement } from "@/hooks/useCraftManagement";
import { formatPrice } from "@/lib/priceFormatter";

import { Spinner } from "flowbite-react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { FaCircleInfo, FaPencil, FaPlus } from "react-icons/fa6";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { EmptyState } from "@/components/common/EmptyState";
import { InfoModal } from "@/components/modal/InfoModal";
import DetailCraftHeader from "@/components/craft/DetailCraftHeader";
import DetailCraftMainImage from "@/components/craft/DetailCraftMainImag";
import DetailCraftThubnails from "@/components/craft/DetailCraftThubnails";
import DetailCraftInfo from "@/components/craft/DetailCraftInfo";
import { detailCraftSchema } from "@/type/schema/DetailCraftSchema";
import CraftManagementForm from "@/components/craft/CraftManagementForm";
import CraftManagementList from "@/components/craft/CraftManagementList";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import VariantManagementList from "@/components/craft/VariantManagementList";
import NoStoreSection from "@/components/dashboard/craft/NoStoreSection";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";
import { craftSchema, craftVariantSchema } from "@/type/schema/CraftSchema";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ManageCraftPage = ({
  id_souvenir_place,
}: {
  id_souvenir_place: string;
}) => {
  const { isSeller } = useUserRole();
  const {
    isOpenForm,
    formType,
    handleCraftForm,
    handleVariantForm,
    handleSubmit,
    initialValues,
    crafts,
    isLoading,
    isPending,
    toggleList,
    isOpenList,
    handleDeleteVariant,
    handleEditCraft,
    isEditCraft,
    toggleEditCraft,
    updateCraftPending,
    handleDeleteCraft,
    selectedDetailVariant,
    setSelectedDetailVariant,
    selectedImg,
    setSelectedImg,
    detailCrafts,
    handleDetailCraftForm,
    toggleForm,
    view,
    setView,
    handleEditVariant,
    updateVariantPending,
    handleDeleteDetailCraft,
  } = useCraftManagement(id_souvenir_place);

  if (!isSeller) return <NoStoreSection />;

  const tableHeaders = ["name", "price", "weight", "stock", "modal", "images"];

  const RenderCraft = () => {
    if (detailCrafts?.length === 0) {
      return <EmptyState onAddNew={handleDetailCraftForm} />;
    }
    return (
      <table className="[&_td]:text-wrap [&_tbody]:font-normal [&_td]:p-2 text-sm w-full">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {detailCrafts?.map((detail, index) => (
            <tr className="hover:bg-gray-100 transition-colors" key={index}>
              <td>{index + 1}</td>
              <td> {` ${detail.variant.craft.name} ${detail.variant.name}`}</td>
              <td className="text-right">{formatPrice(detail.price || 0)}</td>
              <td className="text-right">{detail.weight} gram</td>
              <td className="text-right">
                {detail.stock.toLocaleString()} units
              </td>
              <td className="text-right">
                {detail.modal ? formatPrice(detail.modal) : "-"}
              </td>
              <td className="text-center">{detail?.craftGalleries?.length}</td>
              <td>
                <div className="flex gap-2 items-center justify-center  ">
                  <Link
                    title="edit"
                    className="p-3 bg-white border   rounded border-cyan-400 text-cyan-400 transition-ease-in-out hover:bg-cyan-300 hover:text-white"
                    href={ROUTES.EDIT_CRAFT({
                      craft_variant_id: detail.craft_variant_id,
                      id_souvenir_place: detail.id_souvenir_place,
                    })}
                  >
                    <FaPencil />
                  </Link>

                  <InfoButton
                    onClick={() => setSelectedDetailVariant(detail)}
                  />
                  <DeleteButton
                    onClick={() =>
                      handleDeleteDetailCraft({
                        craft_variant_id: detail.craft_variant_id,
                        id_souvenir_place_id: detail.id_souvenir_place,
                        name: ` ${detail.variant.craft.name} ${detail.variant.name}`,
                      })
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (isLoading) {
    return <ManagementSkeletonLoader />;
  }
  return (
    detailCrafts &&
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
            onClick={handleDetailCraftForm}
            type="button"
            text="new detail craft "
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
          <RenderCraft />
        </section>

        <Modal
          title={`Create ${formType}`}
          isOpen={isOpenForm}
          onClose={toggleForm}
        >
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={
              formType === "detail"
                ? detailCraftSchema
                : formType === "variant"
                ? craftVariantSchema
                : craftSchema
            }
            enableReinitialize
          >
            <Form className="space-y-2   ">
              <CraftManagementForm crafts={crafts} formType={formType} />
              <Button type="submit">
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </Form>
          </Formik>
        </Modal>

        <InfoModal title="Craft List" isOpen={isOpenList} onClose={toggleList}>
          <ViewToggleButtons
            current={view}
            onChange={setView}
            views={["craft", "variant"]}
          />
          {view === "craft" ? (
            <CraftManagementList
              handleCraftForm={handleCraftForm}
              crafts={crafts}
              isLoading={isLoading}
              isEditCraft={isEditCraft}
              updateCraftPending={updateCraftPending}
              toggleEditCraft={toggleEditCraft}
              handleDeleteCraft={handleDeleteCraft}
              handleEditCraft={handleEditCraft}
            />
          ) : (
            <VariantManagementList
              crafts={crafts}
              handleVariantForm={handleVariantForm}
              isLoading={isLoading}
              isEditCraft={isEditCraft}
              updateVariantPending={updateVariantPending}
              toggleEditCraft={toggleEditCraft}
              handleDeleteVariant={handleDeleteVariant}
              handleEditVariant={handleEditVariant}
            />
          )}
        </InfoModal>

        <InfoModal
          onClose={() => setSelectedDetailVariant(null)}
          isOpen={!!selectedDetailVariant}
          title={`${
            !selectedDetailVariant
              ? "detail "
              : `${selectedDetailVariant?.variant.craft.name} ${selectedDetailVariant?.variant.name}`
          }`}
        >
          {selectedDetailVariant && (
            <section className="rounded-3xl overflow-hidden">
              <DetailCraftHeader />
              <section className="p-10 grid lg:grid-cols-2 gap-10">
                <article className=" space-y-6">
                  <DetailCraftMainImage
                    selectedImg={selectedImg}
                    imgCount={selectedDetailVariant?.craftGalleries?.length}
                  />
                  <DetailCraftThubnails
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                    data={selectedDetailVariant?.craftGalleries}
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

export default ManageCraftPage;
