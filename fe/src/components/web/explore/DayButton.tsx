 
 
import { DetailPackageSchema } from "@/type/schema/PackageSchema";
import { Dropdown } from "flowbite-react";
import { FaCaretDown, FaRoad } from "react-icons/fa";

type Props = {
  day:string
  activity : DetailPackageSchema[]
}
export const DayButton = ({day, activity} :Props ) =>{ 
  
     return(
     <div className="flex   text-sm font-normal  ">
        <button
         className="h-full w-fit text-nowrap p-2 text-white rounded-l bg-primary hover:bg-secondary transition ease-in-out"
         type="button"
       >
         Day {day} 
       </button>
       
       <Dropdown className="px-4 py-2" aria-expanded={true} label={day} dismissOnClick={false} renderTrigger={()=>  <button
         className="h-10 p-2 text-white rounded-r bg-primary hover:bg-secondary transition ease-in-out"
         type="button"
       >
         <FaCaretDown />
       </button>}>
       <Dropdown.Item className="flex items-center text-primary border border-primary rounded w-fit gap-2"><FaRoad /> Titik 0 ke 1 </Dropdown.Item>
   
         {activity?.map((ac,index)=>(
            <Dropdown.Item key={index} className="flex items-center text-primary border border-primary rounded w-fit gap-2"><FaRoad /> activity {ac.activity} ke {parseInt(ac.activity)+1} </Dropdown.Item>
         ))}
   
       </Dropdown>
     </div>
   )};