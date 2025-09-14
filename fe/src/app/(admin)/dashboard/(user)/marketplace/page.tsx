"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import Button from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import DetailMarketplaceSection from "@/components/dashboard/marketplace/DetailMarketplaceSection";
import FormStaff from "@/components/dashboard/marketplace/FormStaff";
import RecruitInfo from "@/components/dashboard/marketplace/RecruitInfo";
import { TableRawSkeleton } from "@/components/loading/TableRawSkeleton";
import { Modal } from "@/components/modal/Modal";
import { ROUTES } from "@/data/routes";
import { useManageUserMarketplace } from "@/hooks/useManageUserMarketplace";
import { timeFormatter } from "@/lib/timeFormatter";
import { recrutStaff } from "@/validation/souvenirPlace.validation";
import { Formik } from "formik";
import { ArrowRight, Clock, Edit, Store, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCircleInfo, FaPlus, FaUserPlus, FaUsers } from "react-icons/fa6";

const Marketplace = () => {
  const tableHeaders = [
    "id",
    "name",
    "address",
    "contact_person",
    "open",
    "close",
    "description",
  ];

  const {
    isOpen,
    handleDelete,
    toggleModal,
    data,
    isLoading,
    handleDetailSouvenir,
    selectedSouvenir,
    handleOpenForm,
    handleSubmit,
    modalType,
    initialValues,
    recruiting,
    handleInfoRecruit,
    souvenirPlace,
    isOwner,
  } = useManageUserMarketplace();
  const router = useRouter();

  const RenderSouvenirPlace = () => {
    if (isLoading) return <TableRawSkeleton tableHead={tableHeaders} />;
    if (data?.length === 0) return <EmptyState />;
    return (
      data && (
        <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-3">
          {data?.map((sp, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-md   p-4 hover:shadow-xl hover:border-primary/30 transition-all duration-200 cursor-pointer group relative"
              onClick={() => {
                router.push(ROUTES.MANAGE_CRAFT(sp.id));
              }}
            >
              <section className="absolute h-full grow top-3 right-3 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-primary/10 p-1 rounded-full">
                  <ArrowRight size={14} className="text-primary" />
                </div>
              </section>

              <section className="mb-3 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Store size={20} className="text-primary" />
                </div>
                <h3
                  className="font-semibold text-lg  truncate flex-1 group-hover:text-secondary transition-colors"
                  title={sp.name}
                >
                  {sp.name}
                </h3>
              </section>
              <section className="flex px-3 items-center gap-2 mb-4 ">
                <Clock size={16} />
                <span className="text-sm">
                  {timeFormatter(sp.open)} - {timeFormatter(sp.close)}
                </span>
              </section>
              <section className="flex px-3 items-center gap-2 mb-4 ">
                <FaUsers />
                <span className="text-sm">
                  {
                    sp.detailSouvenir.filter((detail) => detail.status != 0)
                      .length
                  }
                </span>
              </section>
              {
                <section>
                  <div
                    className={`bg-primary/10 ${
                      sp.detailSouvenir?.filter((user) => user.status === 0)
                        .length === 0 && "invisible"
                    } w-fit  px-3 py-1 rounded-full text-sm mb-2  font-medium flex items-center gap-1`}
                  >
                    <FaUserPlus size={10} />
                    {`${
                      sp.detailSouvenir?.filter((user) => user.status === 0)
                        .length
                    } recruiting`}
                  </div>
                </section>
              }

              <section className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-xs text-secondary font-medium">
                  Click to view details →
                </p>
              </section>

              <section className="flex gap-2   h- justify-end">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailSouvenir(sp);
                  }}
                  className="rounded-full"
                >
                  <FaCircleInfo />
                </Button>
                {isOwner(sp) && (
                  <>
                    <Link
                      href={ROUTES.EDIT_MARKETPLACE(sp.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </Link>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(sp.name, sp.id);
                      }}
                      className="rounded-full"
                      variant={"regDanger"}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                )}
              </section>
            </article>
          ))}
        </div>
      )
    );
  };

  return (
    data && (
      <SingleContentWrapper>
        <section className="flex gap-2 w-full items-start">
          <ManagementHeader
            asChild
            content="marketplace"
            title="manage marketplace"
            href={ROUTES.NEW_MARKETPLACE}
          />
          {data.length > 0 && (
            <>
              <Button onClick={handleOpenForm}>
                <FaPlus />
                Recrut Staff
              </Button>
              <Button variant={"regEdit"} onClick={handleInfoRecruit}>
                <FaCircleInfo />
                Recrut Info
              </Button>
            </>
          )}
        </section>
        <section>
          <RenderSouvenirPlace />
        </section>

        <Modal
          isOpen={isOpen}
          onClose={toggleModal}
          title={modalType === "detail" ? `Detail marketplace` : modalType === "form" ? `Recruit Staff` : `Recruit Info`}
        >
          {modalType === "detail" ? (
            <DetailMarketplaceSection souvenirPlace={selectedSouvenir} />
          ) : modalType === "form" ? (
            souvenirPlace.length > 0 ? (
              <Formik
                validationSchema={recrutStaff}
                onSubmit={handleSubmit}
                initialValues={initialValues}
              >
                <FormStaff
                  souvenirPlace={souvenirPlace}
                  isPending={recruiting}
                />
              </Formik>
            ) : (
              <>
                <p className="p-4 border rounded-xl  text-yellow-500 bg-yellow-100 border-yellow-300">
                  You Don&apos;t have your own souvenir places yet.
                </p>
              </>
            )
          ) : (
            <RecruitInfo data={data} />
          )}
        </Modal>
      </SingleContentWrapper>
    )
  );
};

export default Marketplace;
