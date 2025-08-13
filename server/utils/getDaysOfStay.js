const getDaysOfStay = (reservation) => {
  if (
    !reservation ||
    !reservation.detail ||
    reservation.detail.length === 0 ||
    !Array.isArray(reservation.detail)
  ) {
    return 0;
  }
  return (
    Object.values(
      reservation?.detail?.reduce((acc, curr) => {
        const key = `${curr.reservation_id}-${curr.homestay_id}-${curr.unit_type}-${curr.unit_number}`;
        (acc[key] ||= []).push(curr.date);
        return acc;
      }, {})
    )[0]?.length ?? 0
  );
};

module.exports = getDaysOfStay;

