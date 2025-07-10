"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import Button from "@/components/common/Button";
import { DeleteButton } from "@/components/common/DeleteButton";
import { InfoButton } from "@/components/common/InfoButton";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { FormInput } from "@/components/inputs/FormInput";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { Modal } from "@/components/modal/Modal";
import { useCraftManagement } from "@/hooks/useCraftManagement";
import { formatPrice } from "@/lib/priceFormatter";
import {
  type Craft,
  craftSchema,
  craftVariantSchema,
} from "@/type/schema/CraftSchema";
import { Spinner } from "flowbite-react";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import {
  FaCheck,
  FaCircleInfo,
  FaPencil,
  FaPlus,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { EmptyState } from "@/components/common/EmptyState";
import FilePondComponent from "@/components/common/Filepond";
import { InfoModal } from "@/components/modal/InfoModal";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { AnimatePresence, motion } from "framer-motion";
import DetailCraftHeader from "@/components/craft/DetailCraftHeader";
import DetailCraftMainImage from "@/components/craft/DetailCraftMainImag";
import DetailCraftThubnails from "@/components/craft/DetailCraftThubnails";
import DetailCraftInfo from "@/components/craft/DetailCraftInfo";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Craft = () => {
  const {
    isOpenForm,
    isFormCraft,
    handleCraftForm,
    handleVariantForm,
    handleSubmit,
    initialValues,
    crafts,
    variants,
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
    selectedVariant,
    setSelectedVariant,
    selectedImg,
    setSelectedImg,
  } = useCraftManagement();
  
  const tableHeaders = [
    "id",
    "name",
    "price",
    "weight",
    "stock",
    "modal",
    "images",
  ];

  const RenderCraft = () => {
    if (variants?.length === 0) {
      return <EmptyState onAddNew={handleVariantForm} />;
    }
    return (
      <table className="[&_td]:text-wrap [&_tbody]:font-normal [&_td]:p-2 text-sm w-full">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {variants?.map((variant, index) => (
            <tr
              className="hover:bg-gray-100 transition-colors"
              key={variant.id}
            >
              <td>{index + 1}</td>
              <td className="text-center">{variant.id}</td>
              <td> {`${variant.craft.name} ${variant.name}`}</td>
              <td className="text-right">{formatPrice(variant.price || 0)}</td>
              <td className="text-right">{variant.weight} gram</td>
              <td className="text-right">
                {variant.stock.toLocaleString()} units
              </td>
              <td className="text-right">
                {variant.modal ? formatPrice(variant.modal) : "-"}
              </td>
              <td className="text-center">{variant.craftGalleries.length}</td>
              <td>
                <div className="flex gap-2 items-center justify-center  ">
                  <Link
                    title="edit"
                    className="p-3 bg-white border   rounded border-cyan-400 text-cyan-400 transition-ease-in-out hover:bg-cyan-300 hover:text-white"
                    href={`./craft/${variant.id}`}
                  >
                    <FaPencil />
                  </Link>

                  <InfoButton onClick={() => setSelectedVariant(variant)} />
                  <DeleteButton
                    onClick={() =>
                      handleDeleteVariant(
                        variant.id,
                        `${variant.craft.name} ${variant.name}`
                      )
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
          text="new craft "
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
        title={`Create ${isFormCraft ? "Craft" : "Variant"}`}
        isOpen={isOpenForm}
        onClose={handleCraftForm}
      >
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={isFormCraft ? craftSchema : craftVariantSchema}
          enableReinitialize
        >
          <Form className="space-y-2   ">
            {isFormCraft ? (
              <FormInput type="text" label="name" name="name" />
            ) : (
              <>
                <FormInput label="craft" name="id_craft" as="select">
                  {crafts?.map((craft) => (
                    <option key={craft.id} value={craft.id}>
                      {craft.name}
                    </option>
                  ))}
                </FormInput>
                <FormInput type="text" label="name" name="name" />
                <FormInput type="number" label="price" name="price" />
                <FormInput type="number" label="weight (gram)" name="weight" />
                <FormInput type="number" label="modal" name="modal" />
                <FormInput type="number" label="stock" name="stock" />
                <FormInput
                  type="text"
                  rows="4"
                  as="textarea"
                  label="description"
                  name="description"
                />
                <FilePondComponent />
              </>
            )}
            <Button type="submit">{isPending ? <Spinner /> : "Submit"}</Button>
          </Form>
        </Formik>
      </Modal>

      <InfoModal title="Craft List" isOpen={isOpenList} onClose={toggleList}>
        <article className="p-5 space-y-4 [&_input]:!border-slate-300">
          <Button
            onClick={handleCraftForm}
            type="button"
            text="new craft "
            Icon={FaPlus}
          />
          <AnimatePresence mode="popLayout">
            {crafts &&
              !isLoading &&
              crafts?.length > 0 &&
              crafts?.map((craft, index) => (
                <motion.section
                  layoutId={`list${craft.id}`}
                  key={`${index}${craft.id}`}
                  className="relative border-l-8  flex gap-5  items-center p-2 px-5 border-primary bg-slate-200 text-slate-700 rounded-2xl"
                >
                  {isEditCraft === craft.id ? (
                    <motion.div layoutId={`form${craft.id}`} className="grow">
                      <Formik
                        onSubmit={handleEditCraft}
                        initialValues={{ craft_name: craft.name, id: craft.id }}
                      >
                        <Form className="flex gap-4 items-center">
                          <FormInput label={craft.id} name="craft_name" />
                          <motion.div className="flex items-center gap-2 justify-center text-slate-700 ">
                            <ButtonTooltip
                              type="submit"
                              label={`save`}
                              disabled={updateCraftPending}
                            >
                              {updateCraftPending ? <Spinner /> : <FaCheck />}
                            </ButtonTooltip>
                            <ButtonTooltip
                              type="button"
                              variant={"secondary"}
                              label={"cancel"}
                              disabled={updateCraftPending}
                              onClick={() => toggleEditCraft(craft.id)}
                            >
                              <FaXmark />
                            </ButtonTooltip>
                          </motion.div>
                        </Form>
                      </Formik>
                    </motion.div>
                  ) : (
                    <>
                      <motion.p
                        layoutId={`form${craft.id}`}
                        layout
                        className="grow"
                      >
                        {craft.name}
                      </motion.p>
                      <motion.div className="flex items-center gap-2 justify-center text-slate-700 ">
                        <ButtonTooltip
                          onClick={() => toggleEditCraft(craft.id)}
                          label={`Edit`}
                          disabled={updateCraftPending}
                        >
                          {updateCraftPending ? <Spinner /> : <FaPencil />}
                        </ButtonTooltip>
                        <ButtonTooltip
                          variant={`default`}
                          label={`delete`}
                          onClick={() =>
                            handleDeleteCraft(craft.id, craft.name)
                          }
                          disabled={updateCraftPending}
                        >
                          <FaTrash />
                        </ButtonTooltip>
                      </motion.div>
                    </>
                  )}
                </motion.section>
              ))}
          </AnimatePresence>
        </article>
      </InfoModal>

      <InfoModal
        onClose={() => setSelectedVariant(null)}
        isOpen={!!selectedVariant}
        title={`${
          !selectedVariant
            ? "detail "
            : `${selectedVariant?.craft.name} ${selectedVariant?.name}`
        }`}
      >
        {selectedVariant && (
          <section className="rounded-3xl overflow-hidden">
            <DetailCraftHeader />
            <section className="p-10 grid lg:grid-cols-2 gap-10">
              <article className=" space-y-6">
                <DetailCraftMainImage
                  selectedImg={selectedImg}
                  imgCount={selectedVariant.craftGalleries.length}
                />
                <DetailCraftThubnails
                  selectedImg={selectedImg}
                  setSelectedImg={setSelectedImg}
                  data={selectedVariant.craftGalleries}
                />
              </article>
              <DetailCraftInfo data={selectedVariant} />
            </section>
          </section>
        )}
      </InfoModal>
    </SingleContentWrapper>
  );
};

export default Craft;
