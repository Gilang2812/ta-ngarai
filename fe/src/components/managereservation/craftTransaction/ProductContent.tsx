import ImgCraft from "@/components/common/ImgCraft";
import { ShippingItem } from "@/type/schema/CraftTransactionSchema";

export const ProductContent = ({ craft }: { craft: ShippingItem[] }) => {
  return (
    <section className="flex flex-col items-center justify-center p-4">
      <p>Are you sure you want to proceed with the following items? </p>
      <div className="flex items-center justify-center gap-4 ">
        {craft.map((item, index) => (
          <figure
            key={index}
            className="flex border rounded-lg flex-col items-center"
          >
            <ImgCraft
              src={item.detailCraft.craftGalleries?.[0]?.url}
              alt={item.detailCraft.variant.name}
              width={50}
              height={50}
              className="border rounded w-full shadow-sm aspect-square"
            />
            <figcaption className="text-center text-sm p-2 capitalize">
              <p>{`${item.detailCraft.variant.craft.name} ${item.detailCraft.variant.name}`}</p>
              <p>{item.jumlah} x</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
