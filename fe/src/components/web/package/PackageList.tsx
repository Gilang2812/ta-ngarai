"use client";
import {
  FaCircleInfo,
  FaPlus,
  FaPuzzlePiece,
  FaRegClock,
  FaUserGroup,
} from "react-icons/fa6";
import { ImagePlaceHoldeSkeleton } from "@/components/loading/ImagePlaceHolderSkeleton";
import Link from "next/link";
import Button from "@/components/common/Button";
import ButtonTooltip from "@/components/common/ButtonTooltip";
import { FaPlusSquare } from "react-icons/fa";
import { formatPrice } from "@/lib/priceFormatter";
import { usePackageList } from "@/hooks/usePackageList";
import { ContentHeader } from "@/components/common/ContentHeader";
import ImgCraft from "@/components/common/ImgCraft";
import { CardSkeleton } from "@/components/loading/ProfileSkeleton";
export const PackageList = () => {
  const { data, isLoading, handleModifyPackage, createPackage } =
    usePackageList();

  const RenderPackage = () => {
    if (!data || !Array.isArray(data)) return <CardSkeleton />;
    return (
      data &&
      data?.map((item, index) => (
        <article
          key={index}
          className="flex flex-wrap md:flex-nowrap lg:max-w-[calc(50%-2rem)] basis-full md:basis-1/2 grow shrink items-center gap-4"
          aria-labelledby="basic-package-title"
        >
          <figure className="w-44 basis-full grow md:grow-0 md:basis-[200px] min-w-[200px]  shrink rounded overflow-hidden aspect-[4/5]">
            <ImgCraft
              src={item?.packageGalleries?.[0]?.url}
              alt="P "
              width={500}
              height={500}
              loading="lazy"
              className="aspect-auto object-cover w-full left-0 h-full "
            />
          </figure>

          <div className="space-y-4">
            <h2
              id="basic-package-title"
              className="text-xl text-wrap font-bold"
            >
              {item?.name}
            </h2>

            <p className="bg-[#198754] px-2 rounded p-1 text-sm text-white w-fit">
              {item?.type?.type_name}
            </p>

            <p className="flex items-center gap-1">
              <FaRegClock />
              {item?.packageDays?.length}D <FaUserGroup /> Min.
              {item?.min_capacity} People
            </p>

            <section className="leading-relaxed">
              <p className="capitalize">Start from</p>
              <p className="text-orange-400">{formatPrice(item?.price)}</p>

              <div className="flex flex-wrap items-stretch gap-2 ">
                <ButtonTooltip variant={"primary"} label="more infos" asChild>
                  <Link
                    href={"/web/package/" + item?.id}
                    className="  text-nowrap  capitalize    "
                    aria-label="More info about Basic Package"
                  >
                    <FaCircleInfo />
                  </Link>
                </ButtonTooltip>

                <Button
                  onClick={() => {
                    handleModifyPackage({ packageId: item?.id });
                  }}
                  variant={"primary"}
                  type="button"
                >
                  <FaPlusSquare /> Extend
                </Button>
                <Button
                  onClick={() =>
                    handleModifyPackage({ packageId: item.id, isCustom: true })
                  }
                  variant={"primary"}
                  type="button"
                >
                  <FaPuzzlePiece /> custom
                </Button>
              </div>
            </section>
          </div>
        </article>
      ))
    );
  };

  return (
    <>
      <ContentHeader text="available packages" />
      <section className="min-w-fit space-y-6">
        <Button
          onClick={() => createPackage()}
          type="button"
          aria-label="Create custom new package"
        >
          <FaPlus />
          Create New Custom Package
        </Button>
        <div className="flex flex-wrap gap-8 ">
          {isLoading
            ? [...Array(4)].map((_, index) => (
              <div className="basis-1/3 w-1/2 p-8" key={index}>
                <ImagePlaceHoldeSkeleton />{" "}
              </div>
            ))
            : data && <RenderPackage />}
        </div>
      </section>
    </>
  );
};
