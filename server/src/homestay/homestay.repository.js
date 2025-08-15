const { Op, Sequelize } = require("sequelize");
const { col, fn, where, and, literal } = Sequelize;

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
  User,
} = require("../../models/relation");

const detailFacilityHomestayInclude = {
  model: FacilityHomestayDetail,
  as: "details",
  // attributes: ["description"],
  include: [
    {
      model: FacilityHomestay,
      as: "facility",
      // attributes: ["name"],
    },
  ],
};

const galleryHomestayInclude = {
  model: GalleryHomestay,
  as: "galleries",
  // attributes: ["id", "url"],
};

const findHomestays = async () => {
  const homestays = await Homestay.findAll();
  return homestays;
};

const findHomestay = async (condition) => {
  const homestay = await Homestay.findOne({
    where: condition,
  });
  return homestay;
};

const findEditHomestay = async (condition) => {
  const homestay = await Homestay.findOne({
    where: condition,
    include: [detailFacilityHomestayInclude, galleryHomestayInclude],
  });

  return homestay;
};

const findHomestayById = async (id) => {
  const homestay = await Homestay.findByPk(id, {
    include: [
      {
        model: UnitHomestay,
        as: "units",
        include: [
          {
            model: HomestayUnitType,
            as: "unitType",
          },
          {
            model: DetailReservation,
            as: "detailReservations",
            on: Sequelize.literal(
              "`units`.`homestay_id` = `units->detailReservations`.`homestay_id` AND `units`.`unit_type` = `units->detailReservations`.`unit_type` AND `units`.`unit_number` = `units->detailReservations`.`unit_number`"
            ),
            include: [
              {
                model: Reservation,
                as: "reservation",
                attributes: ["id", "user_id"],
                include: [
                  {
                    model: User,
                    as: "customer",
                    attributes: ["fullname", "username"],
                  },
                ],
              },
            ],
          },
          {
            required: false,
            model: GalleryUnit,
            as: "unitGalleries",
            where: Sequelize.and(
              Sequelize.where(
                Sequelize.col(`units.unit_type`),
                Sequelize.col("units->unitGalleries.unit_type")
              ),
              Sequelize.where(
                Sequelize.col(`units.unit_number`),
                Sequelize.col("units->unitGalleries.unit_number")
              )
            ),
          },
          {
            model: FacilityUnitDetail,
            as: "facilityDetails",
            on: literal(
              "`units`.`homestay_id` = `units->facilityDetails`.`homestay_id` AND `units`.`unit_type` = `units->facilityDetails`.`unit_type` AND `units`.`unit_number` = `units->facilityDetails`.`unit_number`"
            ),
            include: [
              {
                model: FacilityUnit,
                as: "unitFacility",
                attributes: ["name"],
              },
            ],
          },
        ],
      },
      detailFacilityHomestayInclude,
      galleryHomestayInclude,
    ],
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

const findUnitHomestay = async (key) => {
  const unit = await UnitHomestay.findOne({
    where: key,
    include: [
      {
        model: GalleryUnit,
        as: "unitGalleries",
        required: false,
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
    ],
  });
  return unit;
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

const findFacilityUnitDetail = async (key) => {
  const facility = await FacilityUnitDetail.findOne({
    where: key,
  });
  return facility;
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
  const { geom, ...rest } = body;
  const geomData = geom
    ? { geom: geom && typeof geom !== "object" ? JSON.parse(geom) : geom }
    : {};
  const homestay = await Homestay.update(
    { ...rest, ...geomData },
    {
      where: { id: body.id },
    }
  );

  return homestay;
};

const destroyHomestay = async (id) => {
  await findHomestayById(id);
  const homestay = await Homestay.findByPk(id);
  homestay.destroy();
  return homestay;
};

const insertUnitHomestay = async (body) => {
  const newUnit = await UnitHomestay.create(body);
  return newUnit;
};

const insertFacilityUnitDetail = async (body) => {
  const newFacilityUnitDetail = await FacilityUnitDetail.create(body);
  return newFacilityUnitDetail;
};

const insertFacilityUnit = async (body) => {
  const newFacilityUnit = await FacilityUnit.create(body);
  return newFacilityUnit;
};
const updateUnitHomestay = async (key, body) => {
  const updatedUnitHomestay = await UnitHomestay.update(body, {
    where: key,
  });
  return updatedUnitHomestay;
};

const deleteUnitHomestay = async (key) => {
  const deletedUnitHomestay = await UnitHomestay.destroy({
    where: key,
  });
  return deletedUnitHomestay;
};

const deleteFacilityUnitDetail = async (key) => {
  const deletedFacilityUnitDetail = await FacilityUnitDetail.destroy({
    where: key,
  });
  return deletedFacilityUnitDetail;
};

const findUnitTypes = async () => {
  const unitTypes = await HomestayUnitType.findAll();
  return unitTypes;
};

module.exports = {
  findHomestays,
  findHomestayById,
  insertHomestay,
  destroyHomestay,
  updateHomestay,
  findUnitHomestays,
  findUnitHomestay,
  findAllUnitHomestays,
  findHomestay,
  findEditHomestay,
  insertUnitHomestay,
  insertFacilityUnitDetail,
  insertFacilityUnit,
  updateUnitHomestay,
  deleteUnitHomestay,
  deleteFacilityUnitDetail,
  findUnitTypes,
  findFacilityUnitDetail
};

 