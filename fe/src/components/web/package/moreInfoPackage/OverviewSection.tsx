
import { useCreateCart } from "@/features/web/package/useCreateCart";
import { imageLoading, imageNotFound, imageUrl } from "@/lib/baseUrl";
import { GalleryPackageSchema } from "@/type/schema/GallerySchema";
import { showSuccessAlert } from "@/utils/AlertUtils";
import { useFormik } from "formik";
import Image from "next/image";
// import { useParams } from "next/navigation";
import { FaRegStar, FaCartPlus } from "react-icons/fa6";
type OverviewProps = {
  isLoading?: boolean;
  packageItem:GalleryPackageSchema
}
export const OverviewSection = ({isLoading,packageItem}:OverviewProps) => {
  // const params = useParams()

  const {mutate} = useCreateCart({
    onSuccess:()=>{
      showSuccessAlert('Success add to cart')
    }
  })
 

  const formik = useFormik({
    initialValues: {
      package_id: packageItem?.package_id,
    },
    onSubmit: async (values) => {
      console.log(values)
     await mutate(values)
    },
  })

  const handleaddToCart = ()=>{
    formik.handleSubmit()
  }
  return (
    <section className="flex gap-16 p-5 bg-white rounded-xl">
      <Image
        src={isLoading ? imageLoading :packageItem?.url?imageUrl+'/package/'+packageItem?.url:imageNotFound}
        alt="Koto Gadang"
        width={300}
        height={300}
        priority
        className="h-auto w-72 rounded-xl "
      />
      <article className="space-y-4">
        <h1 className="text-2xl font-bold">{packageItem?.Package?.name}</h1>
        <div className="flex gap-2 text-2xl text-orange-500">
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
        <section>
          <p>Start from</p>
          <h2 className="text-lg font-semibold">
            Rp {packageItem?.Package?.price.toLocaleString()}
          </h2>
        </section>
        <section>
          <p>{packageItem?.Package?.PackageType.type_name} package</p>
          <p>Min. {packageItem?.Package?.min_capacity} people</p>
        </section>
        <div className="flex gap-3 font-normal">
          <button
            type="button"
            onClick={()=>handleaddToCart()}
            className="btn-primary"
          >
            <FaCartPlus /> Add to Cart
          </button>
          <a
            className="px-3 py-2 text-white bg-green-700 rounded hover:bg-green-900 "
            href="#"
          >
            Book Now
          </a>
        </div>
      </article>
    </section>
  );
};
