// Table.js
 
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function AnnouncementTable({children}:{children:React.ReactNode}) {
  return (
    <table className="w-full">
      <TableHeader />
     {children}
    </table>
  );
}
