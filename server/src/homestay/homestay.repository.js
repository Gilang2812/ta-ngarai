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
        attributes: ["name", "address"],
        include: [detailFacilityHomestayInclude, galleryHomestayInclude],
      },
      {
        model: FacilityUnitDetail,
        as: "facilityDetails",
        attributes: ["description"],
        where: Sequelize.and(
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_type`),
            Sequelize.col("facilityDetails.unit_type")
          ),
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_number`),
            Sequelize.col("facilityDetails.unit_number")
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
        where: Sequelize.and(
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_type`),
            Sequelize.col("unitGalleries.unit_type")
          ),
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_number`),
            Sequelize.col("unitGalleries.unit_number")
          )
        ),
      },
      {
        model: DetailReservation,
        as: "detailReservations",
        where: {
          date: {
            [Op.ne]: newCheckIn,
          },
        },
        include: [
          {
            model: Reservation,
            as: "reservation",
            attributes: ["id", "check_in", "package_id"],
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
  });

  return units;
};

const findAllUnitHomestays = async ({ homestay_id }) => {
  const units = await UnitHomestay.findAll({
    where: { homestay_id },
    include: [
      {
        model: Homestay,
        as: "homestay",
        attributes: ["name", "address"],
        include: [detailFacilityHomestayInclude, galleryHomestayInclude],
      },
      {
        model: FacilityUnitDetail,
        as: "facilityDetails",
        attributes: ["description"],
        where: Sequelize.and(
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_type`),
            Sequelize.col("facilityDetails.unit_type")
          ),
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_number`),
            Sequelize.col("facilityDetails.unit_number")
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
        where: Sequelize.and(
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_type`),
            Sequelize.col("unitGalleries.unit_type")
          ),
          Sequelize.where(
            Sequelize.col(`UnitHomestay.unit_number`),
            Sequelize.col("unitGalleries.unit_number")
          )
        ),
      },
      {
        model: DetailReservation,
        as: "detailReservations",
        where: and(
          where(
            col("detailReservations.homestay_id"),
            col("UnitHomestay.homestay_id")
          ),
          where(
            col("detailReservations.unit_type"),
            col("UnitHomestay.unit_type")
          ),
          where(
            col("detailReservations.unit_number"),
            col("UnitHomestay.unit_number")
          )
        ),
        include: [
          {
            model: Reservation,
            as: "reservation",
            attributes: ["package_id", "check_in"],
            include: [
              {
                model: Package,
                as: "package",
                attributes: ["id"],
                include: [
                  {
                    model: PackageDay,
                    as: "packageDays",
                    attributes: ["day", "package_id"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  return units;
};

const insertHomestay = async (body) => {
  const { geom, ...rest } = body;
  const geomData = geom
    ? { geom: geom && typeof geom !== "object" ? JSON.parse(geom) : geom }
    : {};
  const newHomestay = await Homestay.create({
    ...rest,
    ...geomData,
  });
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
  findAllUnitHomestays,
};

//check in besar dari check_out< tanggal check_in
// checkin +date < reser check_in
// check
