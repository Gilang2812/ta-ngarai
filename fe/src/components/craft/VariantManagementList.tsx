import { CraftResponse } from "@/type/schema/CraftSchema";
import React from "react";
import Button from "../common/Button";
import { FaCheck, FaPencil, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Form, Formik } from "formik";
import { FormInput } from "../inputs/FormInput";
import ButtonTooltip from "../common/ButtonTooltip";
import { Spinner } from "flowbite-react";

type Props = {
  crafts: CraftResponse[];
  handleVariantForm: () => void;
  isLoading: boolean;
  isEditCraft: string | null;
  updateVariantPending: boolean;
  toggleEditCraft: (id: string | null) => void;
  handleDeleteVariant: (id: string, name: string) => void;
  handleEditVariant: (values: {
    variant_name: string;
    id: string;
    id_craft: string;
  }) => void;
};

const VariantManagementList = ({
  crafts,
  handleVariantForm,
  isLoading,
  isEditCraft,
  updateVariantPending,
  toggleEditCraft,
  handleDeleteVariant,
  handleEditVariant,
}: Props) => {
  return (
    <article className="p-5 space-y-4 [&_input]:!border-slate-300">
      <Button
        onClick={handleVariantForm}
        type="button"
        text="new variant"
        Icon={FaPlus}
      />
      <AnimatePresence mode="popLayout">
        {crafts &&
          !isLoading &&
          crafts?.length > 0 &&
          crafts?.map((craft, index) =>
            craft.variants.map((variant, idv) => (
              <motion.section
                layoutId={`list${index} ${idv}`}
                key={`${index}${idv}`}
                className="relative border-l-8  flex gap-5  items-center p-2 px-5 border-primary bg-slate-200 text-slate-700 rounded-2xl"
              >
                {isEditCraft === variant.id ? (
                  <motion.div layoutId={`form${index}${idv}`} className="grow">
                    <Formik
                      onSubmit={handleEditVariant}
                      initialValues={{
                        variant_name: variant.name,
                        id: variant.id,
                        id_craft: craft.id,
                      }}
                    >
                      <Form className="flex gap-4 items-center">
                        <span className="bg-gray-300 rounded p-2">
                          {variant.id}
                        </span>
                        <p>{craft.name}</p>
                        <FormInput name="variant_name" />
                        <motion.div className="flex items-center gap-2 justify-center text-slate-700 ">
                          <ButtonTooltip
                            type="submit"
                            label={`save`}
                            disabled={updateVariantPending}
                          >
                            {updateVariantPending ? <Spinner /> : <FaCheck />}
                          </ButtonTooltip>
                          <ButtonTooltip
                            type="button"
                            variant={"secondary"}
                            label={"cancel"}
                            disabled={updateVariantPending}
                            onClick={() => toggleEditCraft(variant.id)}
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
                      layoutId={`form${index}${idv}`}
                      layout
                      className="grow"
                    >
                      {craft.name} {variant.name}
                    </motion.p>
                    <motion.div className="flex items-center gap-2 justify-center text-slate-700 ">
                      <ButtonTooltip
                        onClick={() => toggleEditCraft(variant.id)}
                        label={`Edit`}
                        disabled={updateVariantPending}
                      >
                        {updateVariantPending ? <Spinner /> : <FaPencil />}
                      </ButtonTooltip>
                      <ButtonTooltip
                        variant={`default`}
                        label={`delete`}
                        onClick={() =>
                          handleDeleteVariant(variant.id, variant.name)
                        }
                        disabled={updateVariantPending}
                      >
                        <FaTrash />
                      </ButtonTooltip>
                    </motion.div>
                  </>
                )}
              </motion.section>
            ))
          )}
      </AnimatePresence>
    </article>
  );
};

export default VariantManagementList;
