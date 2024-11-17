import { ReservationSchema } from "@/type/schema/reservationSchema";
import { Accordion } from "./Accordion";

export const Description = ({ data }: { data: ReservationSchema }) => {
  const include = data.package.detailServices.filter(
    (s) => s.ServicePackage.category == 1
  );
  const exclude = data.package.detailServices.filter(
    (s) => s.ServicePackage.category == 2
  );

  return (
    <section className="overflow-hidden rounded border border-slate-300">
      <Accordion title="description">
        <p>{data.package.description || "no description yet"}</p>
      </Accordion>
      <Accordion title="service">
        <section className="my-4">
          <h3 className="text-lg font-semibold">Service Include</h3>
          <ul className="px-8 list-disc">
            {include.length > 0 &&
              include.map((ic, index) => (
                <li key={index}>{ic.ServicePackage.name}</li>
              ))}
          </ul>
        </section>

        <section className="">
          <h3 className="text-lg font-semibold">Service Exclude</h3>
          <ul className="px-8 list-disc">
            {exclude.length > 0 &&
              exclude.map((ec, index) => (
                <li key={index}>{ec.ServicePackage.name}</li>
              ))}
          </ul>
        </section>
      </Accordion>
      <Accordion title="activity">
        <article className="space-y-2">
          {data.package.packageDays?.map((day, index) => (
            <section key={index} className="space-y-2">
              <h3 className="text-lg font-semibold">Day {day.day}</h3>
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
