const { Sequelize, literal } = require("sequelize");
const {
  Reservation,
  User,
  Package,
  DetailReservation,
  UnitHomestay,
  Homestay,
  HomestayUnitType,
  PackageType,
  PackageDay,
  DetailPackage,
  DetailServicePackage,
  ServicePackage,
  GalleryHomestay,
} = require("../../models/relation");
const {
  include,
} = require("../detailReservation/detailReservation.repository");

const findReservations = async (condition) => {
  const reservations = await Reservation.findAll({
    where: condition,
    include: [
      {
        model: Package,
        as: "package",
        include: {
          model: PackageType,
          as: "type",
        },
      },
      {
        model: User,
        as: "customer",
        attributes: ["fullname", "email", "username", "address", "user_image"],
      },
      {
        model: User,
        as: "confirm",
        attributes: ["fullname"],
      },
      {
        model: User,
        as: "refund",
        attributes: ["fullname"],
      },
    ],
    order: [["check_in", "DESC"]],
  });

  return reservations;
};

const findHomestayReservation = async (id) => {
  const reservation = await Reservation.findOne({
    where: { id },
    include: [
      {
        model: DetailReservation,
        as: "detail",
        include: [
          {
            model: UnitHomestay,
            as: "homestay",
            on: literal(
              "`detail`.`homestay_id` = `detail->homestay`.`homestay_id` and `detail`.`unit_number` = `detail->homestay`.`unit_number` and `detail`.`unit_type` = `detail->homestay`.`unit_type`"
            ),
            include: [
              {
                model: Homestay,
                as: "homestay",
                include: [
                  {
                    model: GalleryHomestay,
                    as: "galleries",
                    limit: 1,
                    attributes: ["id", "url", "homestay_id"],
                  },
                ],
              },
              {
                model: HomestayUnitType,
                as: "unitType",
              },
            ],
          },
        ],
      },
      {
        model: User,
        as: "customer",
        attributes: [
          "fullname",
          "email",
          "username",
          "address",
          "user_image",
          "phone",
        ],
      },
    ],
  });
  return reservation;
};

const findReservationById = async (id) => {
  const reservation = await Reservation.findByPk(id, {
    include: [
      {
        model: Package,
        as: "package",
        include: [
          {
            model: PackageType,
            attributes: ["type_name"],
          },
          {
            model: PackageDay,
            as: "packageDays",
            attributes: ["day", "description"],
            include: {
              model: DetailPackage,
              as: "detailPackages",
              where: {
                day: Sequelize.literal(
                  "`package->packageDays`.`day` = `package->packageDays->detailPackages`.day"
                ),
              },
            },
          },
          {
            model: DetailServicePackage,
            as: "detailServices",
            attributes: ["status", "status_created"],
            include: [
              {
                model: ServicePackage,
                attributes: ["name", "price", "category", "min_capacity"],
              },
            ],
          },
        ],
      },
      {
        model: User,
        as: "customer",
        attributes: ["fullname", "email", "username", "address", "user_image"],
      },
      {
        model: User,
        as: "confirm",
        attributes: ["fullname"],
      },
      {
        model: User,
        as: "refund",
        attributes: ["fullname"],
      },
      {
        model: DetailReservation,
        as: "detail",
        include: [
          {
            model: UnitHomestay,
            as: "homestay",
            where: Sequelize.literal(
              "`detail->homestay`.`unit_number` = `detail`.`unit_number` AND `detail->homestay`.`unit_type` = `detail`.`unit_type`"
            ),
            include: [
              {
                model: Homestay,
              },
              {
                model: HomestayUnitType,
              },
            ],
          },
        ],
      },
    ],
  });

  return reservation;
};

const createReservation = async (data) => {
  const reservation = await Reservation.create(data);
  return reservation;
};

const bulkCreateDetailReservation = async (data) => {
  const detailReservations = await DetailReservation.bulkCreate(data);
  return detailReservations;
};

module.exports = {
  findReservations,
  findReservationById,
  createReservation,
  bulkCreateDetailReservation,
  findHomestayReservation,
};
