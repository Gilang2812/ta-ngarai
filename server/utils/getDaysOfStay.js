const getDaysOfStay = (reservation) => {
  return Object.values(
    reservation?.detail?.reduce((acc, curr) => {
      const key = `${curr.reservation_id}-${curr.homestay_id}-${curr.unit_type}-${curr.unit_number}`;
      (acc[key] ||= []).push(curr.date);
      return acc;
    }, {})
  )[0]?.length??0;
};

module.exports = getDaysOfStay;
