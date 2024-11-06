import React from "react";

interface HeadingProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ id, className, children }) => {
  return (
    <h1 id={id} className={` font-quicksand text-[30px] text-center ${className}`}>
      <strong>{children}</strong>
    </h1>
  );
};

export default Heading;
