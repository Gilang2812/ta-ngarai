import React from "react";

type Props = {
  children: React.ReactNode;
};

const MapControlPanelLayout = (props: Props) => {
  return (
    <section className="flex items-stretch gap-2 py-2">
      {props.children}
    </section>
  );
};

export default MapControlPanelLayout;
