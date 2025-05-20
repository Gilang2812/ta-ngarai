import { Gallery } from "@/components/koto/Gallery";
import { KotoHeader } from "@/components/koto/KotoHeader";
import { Profile } from "@/components/koto/Profile";

export default function DataVillage() {
  return (
    <main className=" bg-white    overflow-hidden p-5 rounded-xl ">
      <KotoHeader />
      <section className="grid grid-cols-1 lg:grid-cols-2 ">
        <Profile />
        <Gallery />
   
      </section>
    </main>
  );
}
