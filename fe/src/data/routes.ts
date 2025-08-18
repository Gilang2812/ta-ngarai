export const ROUTES = {
  HOME: "/web",
  EXPLORE_VILLAGE: "/web/explore",
  MY_PACKAGE: "/web/mypackage",
  TOURISM_PACKAGE: "/web/package",
  CRAFT: "/web/craft",
  DASHBOARD: (role: number) =>
    `/dashboard/${role !== 2 ? "craft" : "managereservation"}`,
  RESERVATION: "/web/reservation",
  PROFILE: "/web/profile",
  UPDATE_PROFILE: "/web/profile/update",
  CHANGE_PASSWORD: "/web/profile/changePassword",
  CART: "/web/cart",
  DETAIL_RESERVATION: (id: string) => `/web/detail-reservation/${id}`,
  DETAIL_RESERVATION_REVIEW: (id: string) =>
    `/web/detail-reservation/review/${id}`,
  DETAIL_RESERVATION_HOMESTAY: (id: string) =>
    `/web/reservation/${id}/homestay/detail`,
  DETAIL_PACKAGE: (id: string) => `/web/package/${id}`,
  CUSTOM_PACKAGE: (id: string) => `/web/custompackage/${id}`,
  EXTEND_PACKAGE: (id: string) => `/web/extend/${id}`,
  DETAIL_CRAFT: (
    id_craft: string,
    id_souvenir_place: string,
    id_craft_variant: string
  ) => `/web/craft/${id_craft}/${id_souvenir_place}?idvr=${id_craft_variant}`,
  PACKAGE_RESERVATION: (id: string) => `/web/reservation/custombooking/${id}`,
  INSTAGRAM: "#",
  TIKTOK: "#",
  LOGIN: "/login",
  REGISTER: "/register",
  MANAGERESERVATION: "/dashboard/managereservation",
  MANAGE_CRAFT_TRANSACTION: "/dashboard/transactioncraft", 
  EXPLORE_WITH_PACKAGE: "/web/explore",
  EXPLORE_WITH_MY_PACKAGE: "/web/mypackage",
  MY_TRANSACTION: "/web/reservation",
  MANAGE_VILLAGE: "/dashboard/koto",
  ANNOUNCEMENT: "/dashboard/announcement",
  PACKAGE: "/dashboard/package",
  NEW_PACKAGE: "/dashboard/package/new",
  MANAGE_DETAIL_PACKAGE: (id: string) => `/dashboard/package/${id}/detail`,
  EDIT_DETAIL_PACKAGE: (id: string) => `/dashboard/package/${id}/edit`,
  PACKAGE_TYPE: "/dashboard/type-package",
  SERVICE_PACKAGE: "/dashboard/service-package",
  HOMESTAY: "/dashboard/homestay",
  NEW_HOMESTAY: "/dashboard/homestay/new",
  MANAGE_DETAIL_HOMESTAY: (id: string) => `/dashboard/homestay/${id}`,
  EDIT_HOMESTAY: (id: string) => `/dashboard/homestay/${id}/edit`,
  MANAGE_USERS: "/dashboard/users",
  MARKETPLACE: "/dashboard/marketplace",
  MANAGE_MARKETPLACE: "/dashboard/manage-marketplace",
  MANAGE_CRAFT: (id_souvenir_place: string) =>
    `/dashboard/craft/${id_souvenir_place}`,
  EDIT_CRAFT: (craft_variant_id: string, id_souvenir_place: string) =>
    `/dashboard/craft/${craft_variant_id}/${id_souvenir_place}`,
  HOMESTAY_RESERVATION: (id: string) => `/web/reservation/${id}/homestay`,
  DETAIL_HOMESTAY: (id: string) => `/web/homestay/${id}`,
  HOMESTAY_RESERVATION_DETAIL: (id: string) =>
    `/web/reservation/${id}/homestay/detail`,
  INVOICE: (id: string, package_id?: string) =>
    package_id ? `/web/invoice/${id}/${package_id}` : `/web/invoice/${id}`,
  MANAGE_UNIT_HOMESTAY: (homestay_id: string) =>
    `/dashboard/unit-homestay/new/${homestay_id}`,
};
