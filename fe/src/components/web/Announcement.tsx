"use client";
import { useFetchAnnouncements } from "@/features/web/useFetchAnnouncement"; 
import { FaBullhorn } from "react-icons/fa";
import { RawSkeleton } from "../loading/RawSkeleton";

function Announcement() {
  const { data, isLoading } = useFetchAnnouncements(); // Assuming it returns announcements array

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <div className="flex items-center mb-2 text-lg font-bold text-red-500">
        <FaBullhorn className="mr-2" />
        Announcement
      </div>
      <ul className="text-black list-disc px-8">
        {isLoading && <RawSkeleton />}
        {data?.map((a, index) => (
          <li key={index}>{a.announcement}</li>
        )) ||!isLoading&& <li>No announcements available.</li>} 
      </ul>
    </div>
  );
}

export default Announcement;
