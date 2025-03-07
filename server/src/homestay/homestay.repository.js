const { Op, Sequelize } = require("sequelize");
const { col, fn, where, and } = Sequelize;

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
  Package,
  PackageDay,
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
        where: Sequelize.and(
          Sequelize.where(Sequelize.col(`UnitHomestay.unit_type`), Sequelize.col("facilityDetails.unit_type")),
          Sequelize.where(Sequelize.col(`UnitHomestay.unit_number`), Sequelize.col("facilityDetails.unit_number"))
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
        where: Sequelize.and(
          Sequelize.where(Sequelize.col(`UnitHomestay.unit_type`), Sequelize.col("unitGalleries.unit_type")),
          Sequelize.where(Sequelize.col(`UnitHomestay.unit_number`), Sequelize.col("unitGalleries.unit_number"))
        ),
      },
      {
        model: DetailReservation,
        as: "detailReservations",
        include: [
          {
            model: Reservation,
            as: "reservation",
            attributes: ["check_in", "package_id"],
            include: [
              {
                model: Package,
                as: "package",
                attributes: [],
              },
            ],
          },
        ],
      },
    ],
    where: Sequelize.literal(`
      NOT EXISTS (
        SELECT 1
        FROM detail_reservation AS dr
        INNER JOIN reservation AS r ON dr.reservation_id = r.id
        INNER JOIN package AS p ON r.package_id = p.id
        INNER JOIN package_day AS pd ON p.id = pd.package_id
        WHERE dr.homestay_id = UnitHomestay.homestay_id
          AND dr.unit_type = UnitHomestay.unit_type
          AND dr.unit_number = UnitHomestay.unit_number
          AND '${newCheckIn}' BETWEEN r.check_in 
          AND DATE_ADD(r.check_in, INTERVAL (SELECT COUNT(*) FROM package_day WHERE package_id = p.id) DAY)
      )
    `),
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
