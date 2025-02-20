const { Sequelize, and, where, col, literal, Op } = require("sequelize");
const {
  FacilityHomestay,
  FacilityHomestayDetail,
  GalleryHomestay,
  Homestay,
  UnitHomestay,
  FacilityUnitDetail,
  FacilityUnit,
  HomestayUnitType,
  GalleryUnit,
  DetailReservation,
  Reservation,
} = require("../../models/relation");

const detailFacilityHomestayInclude = {
  model: FacilityHomestayDetail,
  as: "details",
  attributes: ["description"],
  include: [
    {
      model: FacilityHomestay,
      as: "facility",
      attributes: ["name"],
    },
  ],
};

const galleryHomestayInclude = {
  model: GalleryHomestay,
  as: "galleries",
  attributes: ["id", "url"],
};

const findHomestays = async () => {
  const homestays = await Homestay.findAll();
  return homestays;
};

const findHomestayById = async (id) => {
  const homestay = await Homestay.findByPk(id, {
    include: [detailFacilityHomestayInclude, galleryHomestayInclude],
  });
  return homestay;
};

const findUnitHomestays = async (newCheckIn) => {
  const units = await UnitHomestay.findAll({
    where: Sequelize.where(
      Sequelize.literal(`
        '${newCheckIn}' NOT BETWEEN 
        \`detailReservations->reservation\`.\`check_in\` 
        AND DATE_ADD(
          \`detailReservations->reservation\`.\`check_in\`, 
          INTERVAL (
            SELECT COUNT(*) 
            FROM \`package_day\` 
            WHERE \`package_day\`.\`package_id\` = \`detailReservations->reservation\`.\`package_id\`
          ) DAY
        )
      `),
      true
    ),
    include: [
      {
        model: Homestay,
        as: "homestay",
        attributes: ["name"],
        include: [detailFacilityHomestayInclude, galleryHomestayInclude],
      },
      {
        model: FacilityUnitDetail,
        as: "facilityDetails",
        attributes: ["description"],
        where: and(
          where(
            col(`UnitHomestay.unit_type`),
            col("facilityDetails.unit_type")
          ),
          where(
            col(`UnitHomestay.unit_number`),
            col("facilityDetails.unit_number")
          )
        ),
        include: [
          {
            model: FacilityUnit,
            as: "unitFacility",
            attributes: ["name"],
          },
        ],
      },
      {
        model: HomestayUnitType,
        as: "unitType",
        attributes: ["name_type"],
      },
      {
        model: GalleryUnit,
        as: "unitGalleries",
        where: and(
          where(col(`UnitHomestay.unit_type`), col("unitGalleries.unit_type")),
          where(
            col(`UnitHomestay.unit_number`),
            col("unitGalleries.unit_number")
          )
        ),
      },
      {
        model: DetailReservation,
        as: "detailReservations",
        include: {
          model: Reservation,
          as: "reservation",
          // where: Sequelize.where(
          //   Sequelize.literal(`
          //     \`detailReservations->reservation\`.\`check_in\` <
          //     DATE_SUB(
          //       '${newCheckIn}',
          //       INTERVAL (
          //         SELECT COUNT(*)
          //         FROM \`package_day\`
          //         WHERE \`package_day\`.\`package_id\` = \`detailReservations->reservation\`.\`package_id\`
          //       ) DAY
          //     )
          //   `),
          //   true
          // ),
        },
      },
    ],
  });
  return units;
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
  updateHomestay,
  findUnitHomestays,
};

//check in besar dari check_out< tanggal check_in
// checkin +date < reser check_in
// check
