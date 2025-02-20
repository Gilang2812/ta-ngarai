
import Image from "next/image";
export const Logo = ({className}:{className?:string}) => {
  return <Image className={className} width={100} height={100} src='/Logo.svg' alt="Logo" priority />;
};
