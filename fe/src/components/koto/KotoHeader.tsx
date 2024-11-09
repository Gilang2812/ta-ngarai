import Link from "next/link"
import { FaPencil } from "react-icons/fa6"

export const KotoHeader = ()=>{
    return  <header className="flex justify-between mb-5">
    <h1 className="text-xl font-bold">Manager Village Information</h1>
    <Link
      className="flex items-center gap-2 px-3 py-2 text-white rounded bg-primary"
      href="./koto/edit/KG01"
      aria-label="Edit Village Information"
    >
      <FaPencil /> Edit Information
    </Link>
  </header>
}