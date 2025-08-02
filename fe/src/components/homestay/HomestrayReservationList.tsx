import React from "react";
import ImgCraft from "../common/ImgCraft";
import { CheckBoxInput } from "../common/CheckBoxInput";
import { Rating } from "../craft/Rating";
import { formatPrice } from "@/lib/priceFormatter";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motionVariant";
import { useFormikContext } from "formik";
import { HomestayReservationFormSchemaType } from "@/type/schema/ReservationSchema";
import { AllUnitHomestayResponseSchema } from "@/type/schema/HomestaySchema";
type Props = {
  filteredUnitHomestay: AllUnitHomestayResponseSchema[];
  handleSelectedUnit: (unit: AllUnitHomestayResponseSchema) => void;
  isSelected: (unit: AllUnitHomestayResponseSchema) => boolean;
};

const HomestrayReservationList = ({
  filteredUnitHomestay,
  handleSelectedUnit,
  isSelected,
}: Props) => {
  const { values } = useFormikContext<HomestayReservationFormSchemaType>();
  return (
    <section className="p-4 ">
      <header className="text-left font-bold capitalize px-4 mb-2">
        <h4 className="text-center">Unit Available</h4>
        <div className=" text-secondary font-bold">
          <p>required capacity : {values.total_people}</p>
          <p>capacity selected unit type : {values.selected_capacity}</p>
          <p className="text-yellow-300 text-xs">
            {values.selected_capacity < values.total_people
              ? "warning: Selected capacity is less than required capacity please select more unit or reduce the number of people"
              : " "}
          </p>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          key={values.unit_type}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {filteredUnitHomestay?.map((unit) => (
            <motion.article
              layout="position"
              variants={itemVariants}
              key={`${unit.homestay_id}-${unit.unit_type}-${unit.unit_number}`}
              className="flex gap-4 items-center hover:bg-primary/10 transition-all ease-in-out duration-300 rounded-lg p-4"
              onClick={() => handleSelectedUnit(unit)}
            >
              <CheckBoxInput
                checked={isSelected(unit)}
                readOnly
                name="homestay"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border overflow-hidden rounded-lg ">
                <ImgCraft
                  src={unit?.unitGalleries?.[0]?.url || ""}
                  className=" object-cover h-full  w-full"
                  alt="img homestay"
                  width={300}
                  height={300}
                />
                <article className="border md:col-span-2 flex flex-col justify-between gap-2 p-4 w-full">
                  <p className="text-lg font-semibold">{unit.unit_name}</p>
                  <div className="space-y-1">
                    <Rating
                      rating={
                        unit?.detailReservations
                          ?.filter((dr) => dr.rating)
                          ?.reduce((acc, curr) => acc + curr.rating, 0) /
                          unit?.detailReservations?.filter((dr) => dr.rating)
                            ?.length || 0
                      }
                    />
                    <p className="text-sm">
                      {`${unit.unitType.name_type}, Capacity : ${unit.capacity} people.`}
                    </p>
                  </div>
                  <p className="font-bold">{formatPrice(unit.price)} / day</p>
                </article>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default HomestrayReservationList;
