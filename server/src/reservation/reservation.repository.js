const { Sequelize } = require("sequelize");
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
            model:DetailServicePackage,
            as:"detailServices",
            attributes:['status','status_created'],
            include:[{
              model:ServicePackage,
              attributes:['name','price','category','min_capacity'],
            }]
          }
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

module.exports = { findReservations, findReservationById };
