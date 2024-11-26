// TableRow.js

import { AnnouncementSchema } from "@/type/schema/AnnouncementSchema";
import { DeleteButton } from "../global/DeleteButton";
import { EditButton } from "../global/EditButton";
import { InfoButton } from "../global/InfoButton";

 type RawProps = {
  onInfoClick?: () => void,
  onEditClick?: () => void,
  onDeleteClick?: () => void,
  data:AnnouncementSchema;
  index: number;
 }
 
 
export default function TableRow({onInfoClick,onEditClick,onDeleteClick,data,index}: RawProps) {
  return (
    <tr className="py-2 border-b text-center">
      <td className="py-2">{index}</td>
      <td className="py-2">{data.id}</td>
      <td className="py-2 text-wrap max-w-[500px] text-left">
        {data.announcement}
      </td>
      <td className="py-2 text-center capitalize">{data.status==1?'active':data.status==2&&'non acticve'}</td>
      <td className="py-2 space-x-2 flex justify-center items-center">
         <InfoButton onClick={onInfoClick} />
         <EditButton onClick={onEditClick}/>
         <DeleteButton onClick={onDeleteClick} />
      </td>
    </tr>
  );
}
