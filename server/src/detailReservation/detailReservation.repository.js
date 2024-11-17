const { Sequelize } = require("sequelize");
const {
  DetailReservation,
  Reservation,
  UnitHomestay,
  Homestay,
  HomestayUnitType, 
} = require("../../models/relation");

const include =  [
  {
    model: UnitHomestay,
    as: 'homestay',
    where: Sequelize.literal(
      "`homestay`.`homestay_id` = `DetailReservation`.`homestay_id`   AND `homestay`.`unit_number` = `DetailReservation`.`unit_number` AND `homestay`.`unit_type` = `DetailReservation`.`unit_type`"
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
  {
    model: Reservation,
    as: "reservation",
  },
]

const findDetailReservations = async () => {
  const detailReservations = await DetailReservation.findAll({
    include ,
    order:[['date','DESC']]
 
  });
  return detailReservations;
};

 const findDetailReservationById = async (reservation_id)=>{
  const reservation = await DetailReservation.findAll({
    where : {reservation_id},
    include,
  })

  return reservation; 
 }
module.exports = { findDetailReservations ,findDetailReservationById,include};
