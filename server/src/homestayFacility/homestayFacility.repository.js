const {
  Homestay,
  FacilityHomestayDetail,
  FacilityHomestay,
  FacilityUnit,
} = require("../../models/relation");

const findHomestayFacilities = async () => {
  const homestays = await FacilityHomestay.findAll();
  return homestays;
};

const findDetailHomestayFacilities = async () => {
  const details = await FacilityHomestayDetail.findAll();
  return details;
};

const findHomestayFacilityById = async (id) => {
  const homestay = Homestay.findOne({
    where: { id },
    include: [
      {
        model: FacilityHomestayDetail,
        as: "details",
        attributes: ["facility_homestay_id", "description"],
        include: [
          {
            model: FacilityHomestay,
            as: "facility",
            attributes: ["name"],
          },
        ],
      },
    ],
  });

  return homestay;
};
const findDetailHomestayFacility = async (condition) => {
  const detailFacility = await FacilityHomestayDetail.findOne({
    where: condition,
  });
};

const insertHomestayFacility = async (body) => {
  const newFacility = await FacilityHomestay.create(body);
  return newFacility;
};

const insertDetailHomestayFacility = async (body) => {
  const newDetailFacility = await FacilityHomestayDetail.create(body);
  return newDetailFacility;
};

const destroyDetailHomestayFacility = async (params) => {
  const deleted = await FacilityHomestayDetail.destroy({
    where: params,
  });
  return deleted;
};

const findFacilityUnits = async () => {
  const facilityUnits = await FacilityUnit.findAll();
  return facilityUnits;
};

module.exports = {
  findDetailHomestayFacility,
  findFacilityUnits,
  destroyDetailHomestayFacility,
  insertDetailHomestayFacility,
  findDetailHomestayFacilities,
  findHomestayFacilityById,
  findHomestayFacilities,
  insertHomestayFacility,
};
