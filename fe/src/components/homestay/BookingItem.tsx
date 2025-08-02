import React from "react";

type Props = {
  label: string;
  value: string|number;
};

const BookingItem = (props: Props) => {
  const { label, value } = props;
  return (
    <div className="flex">
      <dt className="font-semibold min-w-40">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
};

export default BookingItem;
