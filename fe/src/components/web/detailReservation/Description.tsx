import { DetailReservationPackage } from "@/type/schema/ReservationSchema";
import { Accordion } from "./Accordion";
import { useService } from "@/utils/ServiceCategory";

export const Description = ({ data }: { data: DetailReservationPackage }) => {
  const include = useService(1, data.package);
  const exclude = useService(0, data.package);

  return (
    <section className="overflow-hidden rounded border border-slate-300">
      <Accordion className="text-sm" title="description">
        <p>{data?.package?.description || "no description yet"}</p>
      </Accordion>
      <Accordion className="text-sm" title="service">
        <section className="my-4">
          <h3 className=" font-semibold">Service Include</h3>
          <ul className="px-8 list-disc">
            {include &&
              include?.length > 0 &&
              include?.map((ic, index) => (
                <li key={index}>{ic?.service?.name}</li>
              ))}
          </ul>
        </section>

        <section className="">
          <h3 className=" font-semibold">Service Exclude</h3>
          <ul className="px-8 list-disc">
            {exclude &&
              exclude.length > 0 &&
              exclude.map((ec, index) => (
                <li key={index}>{ec?.service?.name}</li>
              ))}
          </ul>
        </section>
      </Accordion>
      <Accordion className="text-sm" title="activity">
        <article className="space-y-2">
          {data?.package?.packageDays?.map((day, index) => (
            <section key={index} className="space-y-2">
              <h3 className=" font-semibold">Day {day.day}</h3>
              <ol className="px-4 list-decimal">
                {day.detailPackages.map((dp, index: number) => (
                  <li key={index}>{dp.description}</li>
                ))}
              </ol>
            </section>
          ))}
        </article>
      </Accordion>
    </section>
  );
};
