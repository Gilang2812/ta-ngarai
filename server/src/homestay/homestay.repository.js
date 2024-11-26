const { FacilityHomestay } = require("../../models/FacilityHomestay");
const {
  FacilityHomestayDetail,
} = require("../../models/FacilityHomestayDetail");
const { GalleryHomestay } = require("../../models/GalleryHomestayModel");
const { Homestay } = require("../../models/HomestayModel");
const { CustomError } = require("../../utils/CustomError");

const findHomestays = async () => {
  const homestays = await Homestay.findAll();
  return homestays;
};

const findHomestayById = async (id) => {
  const homestay = await Homestay.findByPk(id, {
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
      {
        model: GalleryHomestay,
        as: "galleries",
        attributes: ["id", "url"],
      },
    ],
  });
  return homestay;
};

const insertHomestay = async (body) => {
  await Homestay.sync();
  const newHomestay = await Homestay.create(body);
  return newHomestay;
};

const updateHomestay = async (body) => {
  console.log(body);
  const sss = await Homestay.update(body, {
    where: { id: body.id },
  });
  
  return sss;  
};

const destroyHomestay = async (id) => {
  await findHomestayById(id);
  const homestay = await Homestay.findByPk(id);
  homestay.destroy();
  return homestay;
};
module.exports = {
  findHomestays,
  findHomestayById,
  insertHomestay,
  destroyHomestay,
  updateHomestay
};
