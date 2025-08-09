import Button from "@/components/common/Button";
import ImgNotFound from "@/components/common/ImgNotFound";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { useCreateCart } from "@/features/web/package/useCreateCart";
import { imageLoading, imageNotFound, imageUrl } from "@/lib/baseUrl";
import { formatPrice } from "@/lib/priceFormatter";
import {
  PackageReservationSchema,
  PackageServiceGallery,
} from "@/type/schema/PackageSchema";
import { showSuccessAlert } from "@/utils/AlertUtils";
import { Carousel } from "flowbite-react";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaCartPlus, FaStar } from "react-icons/fa6";

type Props = {
  data: PackageServiceGallery & { reservation: PackageReservationSchema[] };
  isLoading?: boolean;
};
export const OverviewSection = ({ data, isLoading }: Props) => {
  const rating =
    data?.reservation?.reduce((acc, curr) => acc + (curr.rating || 0), 0) || 0;
  const rated =
    data?.reservation?.filter((item) => item.rating > 0).length || 0;
  const averageRating = rated ? Math.floor(rating / rated) : 0;

  const { mutate } = useCreateCart({
    onSuccess: () => {
      showSuccessAlert("Success add to cart");
    },
  });

  const formik = useFormik({
    initialValues: {
      package_id: data.id,
    },
    onSubmit: async () => {
      mutate({ package_id: data.id });
    },
  });

  const handleaddToCart = () => {
    formik.handleSubmit();
  };
  return (
    <SingleContentWrapper className="grid min-w-fit  grid-cols-2 gap-10 p-5  ">
      <div className=" max-w-[300px]  ">
        <Carousel>
          {data?.packageGalleries?.length > 0 ? (
            data?.packageGalleries?.map((gc, index) => (
              <div key={index} className="w-full h-full">
                <Image
                  src={
                    isLoading
                      ? imageLoading
                      : gc?.url
                      ? imageUrl + "/package/" + gc?.url
                      : imageNotFound
                  }
                  alt="Koto Gadang"
                  width={500}
                  height={500}
                  priority
                  className=" object-cover h-full w-full rounded-xl "
                />
              </div>
            ))
          ) : (
            <ImgNotFound />
          )}
        </Carousel>
      </div>
      <article className="space-y-4 min-w-fit  ">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="flex gap-2 text-2xl text-orange-500">
          {Array.from({ length: 5 }, (_, index) =>
            index < averageRating ? (
              <FaStar key={index} />
            ) : (
              <FaRegStar key={index} />
            )
          )}
        </div>
        <section>
          <p>Start from</p>
          <h2 className="text-lg font-semibold">{formatPrice(data?.price)}</h2>
        </section>
        <section>
          <p>{data?.type?.type_name} package</p>
          <p>Min. {data?.min_capacity} people</p>
        </section>
        <div className="flex   min-w-fit flex-wrap md:flex-nowrap gap-3 font-normal">
          <Button
            className="text-nowrap"
            type="button"
            variant={"primary"}
            onClick={() => handleaddToCart()}
          >
            <FaCartPlus /> Add to Cart
          </Button>
          <Button className="text-nowrap" asChild variant={"success"}>
            <Link href={`/web/reservation/custombooking/${data?.id}`}>
              Book Now
            </Link>
          </Button>
        </div>
      </article>
    </SingleContentWrapper>
  );
};
