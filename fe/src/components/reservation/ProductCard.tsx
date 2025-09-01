import { ShippingItem } from "@/type/schema/CraftTransactionSchema";
import ImgCraft from "../common/ImgCraft";
import { formatPrice } from "@/lib/priceFormatter";

type Props = {
  product: ShippingItem;
};

export const ProductCard = ({ product }: Props) => (
  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
    <ImgCraft
      alt={product.detailCraft.variant.name}
      width={50}
      height={50}
      src={product?.detailCraft?.craftGalleries?.[0]?.url}
    />
    <div className="flex-1">
      <h4 className="font-medium ">
        {product?.detailCraft?.variant?.craft?.name}{" "}
        {product?.detailCraft?.variant?.name}
      </h4>
    </div>
    <div className="text-right">
      <div className="font-medium ">
        {formatPrice(product?.detailCraft?.price)}
      </div>
      <div className="text-sm ">Qty: {product.jumlah}</div>
    </div>
  </div>
);
