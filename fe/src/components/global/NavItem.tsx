import Link from "next/link"

export const NavItem = ({link,label}:{link:string,label:string})=>{
    return <Link className="hover:text-primary cursor-pointer transition-ease-in-out" href={link}>
    {label}
  </Link>
}