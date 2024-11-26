const {
  Homestay,
  FacilityHomestayDetail,
  FacilityHomestay,
} = require("../../models/relation");

const findHomestayFacilities = async()=>{
  const homestays =await FacilityHomestay.findAll();
  return homestays;
}

const findDetailHomestayFacilities = async()=>{
  const details = await FacilityHomestayDetail.findAll();
  return details;
}

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

  return homestay
};

const insertHomestayFacility =async (body)=>{
  const newFacility = await FacilityHomestay.create(body)
  return newFacility
}

const insertDetailHomestayFacility = async (body)=>{
  const newDetailFacility = await FacilityHomestayDetail.create(body)
  return newDetailFacility
}

const destroyDetailHomestayFacility = async (params)=>{
  const deleted =await FacilityHomestayDetail.destroy({
    where:params
  })
  return deleted
}
module.exports = {destroyDetailHomestayFacility,insertDetailHomestayFacility,findDetailHomestayFacilities, findHomestayFacilityById,findHomestayFacilities ,insertHomestayFacility};
