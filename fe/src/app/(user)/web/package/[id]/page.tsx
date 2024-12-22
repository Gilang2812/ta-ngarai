 
import React from 'react';
import { InfoSection } from "@/components/web/package/moreInfoPackage/InfoSection";
 
export default async function MoreInfo ({
  params,
}: {
  params: Promise<{ id: string }>
})  {
 const id = (await params).id
 console.log(id)

  return (
    <main className="grid grid-cols-12 gap-6">
      <InfoSection id={id} />
   </main>
  );
};
 