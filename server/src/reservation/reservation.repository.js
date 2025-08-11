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
const getDaysOfStay = require("../../utils/getDaysOfStay");

const findOneReservation = async (condition) => {
  const reservation = await Reservation.findOne({
    where: condition,
  });

  return reservation;
};

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
      {
        model: DetailReservation,
        as: "detail",
      },
    ],
    order: [["request_date", "DESC"]],
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
        order: [[{ model: UnitHomestay, as: "homestay" }, "unit_name", "ASC"]],
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

  const getDayOfStay = getDaysOfStay(reservation);
  const data = reservation && reservation.toJSON();
  data?.detail?.sort((a, b) => {
    const nameA = a.homestay?.unit_name || "";
    const nameB = b.homestay?.unit_name || "";
    return nameA.localeCompare(nameB);
  });
  const reponse = data;
  if (getDayOfStay) {
    reponse.days_of_stay = getDayOfStay;
  }
  return reponse;
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
            as: "type",
          },
          {
            model: PackageDay,
            as: "packageDays",
            attributes: ["day", "description"],
            include: [
              {
                model: DetailPackage,
                as: "detailPackages",
                where: {
                  day: Sequelize.literal(
                    "`package->packageDays`.`day` = `package->packageDays->detailPackages`.`day` AND `package->packageDays->detailPackages`.`package_id` = `package->packageDays`.`package_id`"
                  ),
                },
              },
            ],
          },
          {
            model: DetailServicePackage,
            as: "detailServices",
            attributes: ["status", "status_created"],
            include: [
              {
                model: ServicePackage,
                attributes: ["name", "price", "category", "min_capacity"],
                as: "service",
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
        order: [[{ model: UnitHomestay, as: "homestay" }, "unit_name", "ASC"]],
        include: [
          {
            model: UnitHomestay,
            as: "homestay",
            where: Sequelize.literal(
              "`detail->homestay`.`unit_number` = `detail`.`unit_number` AND `detail->homestay`.`unit_type` = `detail`.`unit_type`"
            ),
            attributes: [
              "homestay_id",
              "unit_type",
              "unit_number",
              "description",
              "unit_name",
              "price",
              "capacity",
            ],
            include: [
              {
                model: Homestay,
                as: "homestay",
                attributes: [
                  "id",
                  "name",
                  "address",
                  "description",
                  "contact_person",
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
    ],
  });
  const days_of_stay = getDaysOfStay(reservation);
  const data = reservation.toJSON();
  data.detail.sort((a, b) => {
    const nameA = a.homestay?.unit_name || "";
    const nameB = b.homestay?.unit_name || "";
    return nameA.localeCompare(nameB);
  });
  return {
    days_of_stay,
    ...data,
  };
};

const createReservation = async (data) => {
  const reservation = await Reservation.create(data);
  return reservation;
};

const bulkCreateDetailReservation = async (data) => {
  const detailReservations = await DetailReservation.bulkCreate(data);
  return detailReservations;
};

const updateReservation = async (key, data) => {
  const updatedDetail = await Reservation.update(data, {
    where: key,
  });
  return updatedDetail;
};

const deleteReservation = async (id) => {
  const deleted = await Reservation.destroy({
    where: { id },
  });
  return deleted;
};

module.exports = {
  findReservations,
  findReservationById,
  createReservation,
  bulkCreateDetailReservation,
  findHomestayReservation,
  updateReservation,
  deleteReservation,
  findOneReservation,
};
