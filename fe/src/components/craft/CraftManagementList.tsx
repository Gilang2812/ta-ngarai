import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaCheck, FaPencil, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import Button from "../common/Button";
import { type CraftResponse } from "@/type/schema/CraftSchema";
import { Form, Formik } from "formik";
import { FormInput } from "../inputs/FormInput";
import ButtonTooltip from "../common/ButtonTooltip";
import { Spinner } from "flowbite-react";

type Props = {
  handleCraftForm: () => void;
  crafts: CraftResponse[];
  isLoading: boolean;
  isEditCraft: string | null;
  updateCraftPending: boolean;
  toggleEditCraft: (id: string | null) => void;
  handleDeleteCraft: (id: string, name: string) => void;
  handleEditCraft: (values: { craft_name: string; id: string }) => void;
};

const CraftManagementList = ({
  handleCraftForm,
  crafts,
  isLoading,
  isEditCraft,
  updateCraftPending,
  toggleEditCraft,
  handleDeleteCraft,
  handleEditCraft,
}: Props) => {
  return (
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
                      onClick={() => handleDeleteCraft(craft.id, craft.name)}
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
  );
};

export default CraftManagementList;
