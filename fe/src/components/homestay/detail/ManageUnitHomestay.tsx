"use client";
import Button from "@/components/common/Button";
import ButtonResetForm from "@/components/common/ButtonResetForm";
import FilePondComponent from "@/components/common/Filepond";
import ImgCraft from "@/components/common/ImgCraft";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { Table } from "@/components/common/Table";
import { FormInput } from "@/components/inputs/FormInput";
import DetailHomestayReservationLoader from "@/components/loading/DetailHomestayReservationloader";
import { Modal } from "@/components/modal/Modal";
import { ROUTES } from "@/data/routes";
import { useManageUnitHomestay } from "@/hooks/useManageUnitHomestay";
import {
  createFacilitySchema,
  createFacilityUnitSchema,
  createUnitSchema,
} from "@/validation/homestaySchema";
import { Form, Formik } from "formik";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import {
  FaPencil,
  FaPhotoFilm,
  FaPlus,
  FaTable,
  FaTrash,
} from "react-icons/fa6";

type Props = { id: string };

const ManageUnitHomestay = ({ id }: Props) => {
  const {
    data,
    unitTypes,
    facilityUnits,
    isLoading,
    formType,
    selectedGalleries,
    unitInitialValues,
    isOpen,
    toggleModal,
    handleAddUnit,
    handleAddFacility,
    handleAddDetailFacility,
    handleEditUnit,
    handleShowGallery,
    facilityUnitInitialValues,
    facilityInitialValues,
    handleSubmit,
    handleDeleteUnit,
    handleDeleteFacilityUnitDetail,
  } = useManageUnitHomestay(id);

  if (isLoading) return <DetailHomestayReservationLoader />;
  if (!data) return <SingleContentWrapper>No data found</SingleContentWrapper>;

  return (
    data &&
    unitTypes &&
    facilityUnits && (
      <SingleContentWrapper>
        <header className="text-center space-y-12 mb-8 capitalize">
          <h2>Unit Homestay {data.name}</h2>
          <section className="flex items-center gap-4  justify-between">
            <div className="flex">
              <Button
                onClick={handleAddUnit}
                variant={"primary"}
                className="rounded-r-none"
              >
                <FaPlus />
                Unit Homestay
              </Button>
              <Button
                onClick={handleAddDetailFacility}
                variant={"regEdit"}
                className="rounded-none"
              >
                <FaPlus />
                Facility Unit
              </Button>
              <Button
                onClick={handleAddFacility}
                variant={"regSecondary"}
                className="rounded-l-none"
              >
                <FaPlus />
                Facility
              </Button>
            </div>
            <div>
              <Button className="flex-nowrap" variant={"regSuccess"} asChild>
                <Link href={ROUTES.HOMESTAY}>
                  <FaTable />
                  Homestay
                </Link>
              </Button>
            </div>
          </section>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.units.map((unit, index) => (
            <SingleContentWrapper
              key={`$${index}-${unit.homestay_id}-${unit.unit_type}-${unit.unit_number}`}
              className="border"
            >
              <header className="flex gap-4 flex-wrap justify-between">
                <h3>{unit.unit_name}</h3>
                <section className="flex">
                  <Button
                    onClick={() => handleShowGallery(unit.unitGalleries)}
                    variant={"primary"}
                    className="rounded-r-none"
                  >
                    <FaPhotoFilm />
                  </Button>
                  <Button
                    onClick={() => handleEditUnit(unit)}
                    variant={"regWarning"}
                    className="rounded-none"
                  >
                    <FaPencil />
                  </Button>
                  <Button
                    onClick={() => handleDeleteUnit(unit)}
                    variant={"regDanger"}
                    className="rounded-l-none"
                  >
                    <FaTrash />
                  </Button>
                </section>
              </header>
              <article>
                <p>price: {unit.price} </p>
                <p>capacity: {unit.capacity}</p>
                <p>{unit.description}</p>
              </article>
              <section className="space-y-4 py-4">
                <p>Facility</p>
                <Table>
                  <thead>
                    <tr className="border-b-2">
                      <th>No</th>
                      <th>Facility</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.facilityDetails.map((facility, index) => (
                      <tr className="border-b" key={`facility-${index}`}>
                        <td>{index + 1}</td>
                        <td>{facility.unitFacility.name}</td>
                        <td>{facility.description}</td>
                        <td>
                          <div className="flex items-center justify-center">
                            <Button
                              onClick={() =>
                                handleDeleteFacilityUnitDetail({
                                  ...facility,
                                  facility_name: facility.unitFacility.name,
                                })
                              }
                              variant={"regDanger"}
                            >
                              <FaTimes />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </section>
            </SingleContentWrapper>
          ))}
        </section>
        <Modal
          title={
            formType === "unit"
              ? "Unit Homestay"
              : formType === "detail"
              ? "Facility Unit"
              : formType === "facility"
              ? "Data Facility"
              : formType === "gallery"
              ? "Gallery Unit"
              : formType === "edit"
              ? "Edit Unit"
              : "Unknown"
          }
          isOpen={isOpen}
          onClose={toggleModal}
        >
          {formType === "gallery" ? (
            <section className="p-4 flex justify-left items-center gap-4">
              {selectedGalleries?.length !== 0 ? (
                selectedGalleries?.map((g, index) => (
                  <ImgCraft
                    alt={`Gallery image ${index + 1}`}
                    width={100}
                    className="size-24 object-cover"
                    height={100}
                    key={index}
                    src={g.url}
                  />
                ))
              ) : (
                <p>No images added yet</p>
              )}
            </section>
          ) : (
            <Formik
              initialValues={
                formType === "unit" || formType === "edit"
                  ? unitInitialValues
                  : formType === "detail"
                  ? facilityUnitInitialValues
                  : facilityInitialValues
              }
              onSubmit={handleSubmit}
              validationSchema={
                formType === "unit" || formType === "edit"
                  ? createUnitSchema
                  : formType === "detail"
                  ? createFacilityUnitSchema
                  : createFacilitySchema
              }
            >
              <Form>
                {formType === "unit" || formType === "edit" ? (
                  <section>
                    {formType}
                    <FormInput
                      type="text"
                      name="homestay_id"
                      label="Homestay ID"
                      readonly
                    />
                    <FormInput
                      type="text"
                      name="unit_type"
                      label="Unit Type"
                      as="select"
                      readonly={formType === "edit"}
                    >
                      {Array.isArray(unitTypes) &&
                        unitTypes.map((type, index) => (
                          <option
                            key={`${index}-${type.id}`}
                            value={type.id}
                          >{`${type.name_type}`}</option>
                        ))}
                    </FormInput>
                    <FormInput type="text" name="unit_name" label="Unit Name" />
                    <FormInput
                      type="text"
                      name="description"
                      label="Description"
                    />
                    <FormInput type="number" name="capacity" label="Capacity" />
                    <FormInput type="number" name="price" label="Price" />
                    <FilePondComponent name="images" />
                  </section>
                ) : formType === "detail" ? (
                  <>
                    <FormInput
                      type="text"
                      name="unitHomestay"
                      label="Unit Homestay"
                      as="select"
                    >
                      {data?.units.map((unit, index) => (
                        <option
                          key={`${index}-${unit.homestay_id}-${unit.unit_type}-${unit.unit_number}`}
                          value={JSON.stringify({
                            homestay_id: unit.homestay_id,
                            unit_number: unit.unit_number,
                            unit_type: unit.unit_type,
                          })}
                        >
                          {`[${unit.unitType.name_type}]`} {unit.unit_number}{" "}
                          {unit.unit_name}
                        </option>
                      ))}
                    </FormInput>
                    <FormInput
                      type="text"
                      name="facility_unit_id"
                      label="Facility Unit "
                      as="select"
                    >
                      {Array.isArray(facilityUnits) &&
                        facilityUnits.map((unit, index) => (
                          <option
                            key={`${index}-${unit.id}`}
                            value={unit.id}
                          >{`${unit.name}`}</option>
                        ))}
                    </FormInput>
                    <FormInput
                      type="text"
                      name="description"
                      label="Description"
                    />
                  </>
                ) : (
                  <>
                    <FormInput type="text" name="name" label="Unit Name" />
                  </>
                )}
                <div className="py-4 flex items-center justify-end gap-4">
                  <Button type="submit" variant={"primary"}>
                    <FaPlus />
                  </Button>
                  <ButtonResetForm variant={"regDanger"}>
                    <FaTrash />
                  </ButtonResetForm>
                </div>
              </Form>
            </Formik>
          )}
        </Modal>
      </SingleContentWrapper>
    )
  );
};

export default ManageUnitHomestay;
