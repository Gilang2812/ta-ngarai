const { Sequelize } = require("sequelize");
const { Announcement } = require("./AnnouncementModel");
const { AuthGroup } = require("./AuthGroupModel");
const { AuthGroupUsers } = require("./AuthGroupUsers");
const { DetailPackage } = require("./DetailPackage");
const { DetailServicePackage } = require("./DetailServicePackage");
const { Facility } = require("./Facility.js");
const { FacilityType } = require("./FacilityType");
const { GalleryTourism } = require("./GalleryTourismModel");
const { Package } = require("./Package");
const { PackageDay } = require("./PackageDay");
const { PackageType } = require("./PackageType");
const { ServicePackage } = require("./ServicePackage");
const { TourismVillage } = require("./TourismVillageModel");
const { User } = require("./UsersModels");
const { GalleryPackage } = require("./GalleryPackage.js");
const { Reservation } = require("./ReservationModel.js");
const { Homestay } = require("./HomestayModel.js");
const { UnitHomestay } = require("./UnitHomestayModel.js");
const { HomestayUnitType } = require("./HomestayUnitTypeModel.js");
const { DetailReservation } = require("./DetailReservationModel.js");
const { FacilityHomestayDetail } = require("./FacilityHomestayDetail.js");
const { FacilityHomestay } = require("./FacilityHomestay.js");
const { GalleryHomestay } = require("./GalleryHomestayModel.js");
const { Cart } = require("./CartModel.js");
const { FacilityUnitDetail } = require("./FacilityUnitDetailModel.js");
const { GalleryUnit } = require("./GalleryUnitModel.js");
const { FacilityUnit } = require("./FacilityUnitModel.js");
const CraftVariant = require("./CraftVariantModel.js");
const { Craft } = require("./CraftModel.js");
const ShippingAddress = require("./ShippingAddressModel.js");
const { Checkout } = require("./CheckoutModel.js");
const { ItemCheckout } = require("./ItemCheckoutModel.js");
const CraftVariantGallery = require("./CraftVariantGalleryModel.js");
const ItemCheckoutReviewGallery = require("./ItemCheckoutReviewGalleryModel.js");
const { SouvenirPlace } = require("./SouvenirPlace.js");
const Shipping = require("./ShippingModel.js");
const DetailMarketplaceCraft = require("./DetailMarketplaceCraft.js");
const { Role } = require("./RoleModel.js");

User.hasMany(AuthGroupUsers, { foreignKey: "user_id", as: "user" });
AuthGroup.hasMany(AuthGroupUsers, { foreignKey: "group_id", as: "group" });

AuthGroupUsers.belongsTo(User, { foreignKey: "user_id", as: "user" });
AuthGroupUsers.belongsTo(User, { foreignKey: "group_id", as: "group" });

User.hasMany(Announcement, { foreignKey: "admin_id" });
Announcement.belongsTo(User, { foreignKey: "admin_id" });

TourismVillage.hasMany(GalleryTourism, {
  foreignKey: "tourism_village_id",
  as: "galleries",
});
GalleryTourism.belongsTo(TourismVillage, {
  foreignKey: "tourism_village_id",
  as: "village",
});

DetailPackage.belongsTo(PackageDay, {
  foreignKey: "package_id",
  targetKey: "package_id",
  as: "packageDay",
});
DetailPackage.belongsTo(PackageDay, {
  foreignKey: "day",
  targetKey: "day",
  as: "packageDayByDay",
});

PackageDay.hasMany(DetailPackage, {
  foreignKey: "package_id",
  sourceKey: "package_id",
  as: "detailPackages",
});

PackageDay.belongsTo(Package, {
  foreignKey: "package_id",
  as: "package",
});
Package.hasMany(PackageDay, {
  foreignKey: "package_id",
  sourceKey: "id",
  as: "packageDays",
});
Package.hasMany(DetailServicePackage, {
  foreignKey: "package_id",
  as: "detailServices",
});
ServicePackage.hasMany(DetailServicePackage, {
  foreignKey: "service_package_id",
});
DetailServicePackage.belongsTo(Package, { foreignKey: "package_id" });
DetailServicePackage.belongsTo(ServicePackage, {
  foreignKey: "service_package_id",
  as: "service",
});

PackageType.hasMany(Package, { foreignKey: "type_id" });
Package.belongsTo(PackageType, { foreignKey: "type_id", as: "type" });

FacilityType.hasMany(Facility, { foreignKey: "type_id" });
Facility.belongsTo(FacilityType, { foreignKey: "type_id" });

GalleryPackage.belongsTo(Package, { foreignKey: "package_id" });
Package.hasMany(GalleryPackage, {
  foreignKey: "package_id",
  as: "packageGalleries",
});

Reservation.belongsTo(User, { foreignKey: "user_id", as: "customer" });
Reservation.belongsTo(User, { foreignKey: "admin_confirm", as: "confirm" });
Reservation.belongsTo(User, { foreignKey: "admin_refund", as: "refund" });

User.hasMany(Reservation, { foreignKey: "user_id" });
User.hasMany(Reservation, { foreignKey: "admin_confirm" });
User.hasMany(Reservation, { foreignKey: "admin_refund" });

Reservation.belongsTo(Package, { foreignKey: "package_id", as: "package" });
Package.hasMany(Reservation, { foreignKey: "package_id", as: "reservation" });

Homestay.hasMany(UnitHomestay, { foreignKey: "homestay_id", as: "units" });
HomestayUnitType.hasMany(UnitHomestay, { foreignKey: "unit_type" });

UnitHomestay.belongsTo(Homestay, { foreignKey: "homestay_id", as: "homestay" });
UnitHomestay.belongsTo(HomestayUnitType, {
  foreignKey: "unit_type",
  as: "unitType",
});

Reservation.hasMany(DetailReservation, {
  foreignKey: "reservation_id",
  as: "detail",
});
DetailReservation.belongsTo(Reservation, {
  foreignKey: "reservation_id",
  as: "reservation",
});
UnitHomestay.hasMany(DetailReservation, {
  foreignKey: "homestay_id",
  sourceKey: "homestay_id",
  constraints: true,
  as: "detailReservations",
});

UnitHomestay.hasMany(DetailReservation, {
  foreignKey: "unit_type",
  sourceKey: "unit_type",
  constraints: true,
});

UnitHomestay.hasMany(DetailReservation, {
  foreignKey: "unit_number",
  sourceKey: "unit_number",
  constraints: true,
});

DetailReservation.belongsTo(UnitHomestay, {
  foreignKey: "homestay_id",
  targetKey: "homestay_id",
  constraints: true,
  as: "homestay",
});

DetailReservation.belongsTo(UnitHomestay, {
  foreignKey: "unit_type",
  targetKey: "unit_type",
  constraints: true,
  as: "unit",
});

DetailReservation.belongsTo(UnitHomestay, {
  foreignKey: "unit_number",
  targetKey: "unit_number",
  constraints: true,
  as: "number",
});

UnitHomestay.hasMany(FacilityUnitDetail, {
  foreignKey: "homestay_id",
  sourceKey: "homestay_id",
  constraints: true,
  as: "facilityDetails",
});

UnitHomestay.hasMany(FacilityUnitDetail, {
  foreignKey: "unit_type",
  sourceKey: "unit_type",
  constraints: true,
});

UnitHomestay.hasMany(FacilityUnitDetail, {
  foreignKey: "unit_number",
  sourceKey: "unit_number",
  constraints: true,
});
FacilityUnitDetail.belongsTo(UnitHomestay, {
  foreignKey: "homestay_id",
  targetKey: "homestay_id",
  constraints: true,
  as: "facilityUnit",
});

FacilityUnitDetail.belongsTo(UnitHomestay, {
  foreignKey: "unit_type",
  targetKey: "unit_type",
  constraints: true,
});

FacilityUnitDetail.belongsTo(UnitHomestay, {
  foreignKey: "unit_number",
  targetKey: "unit_number",
});

UnitHomestay.hasMany(GalleryUnit, {
  foreignKey: "homestay_id",
  sourceKey: "homestay_id",
  constraints: true,
  as: "unitGalleries",
});

UnitHomestay.hasMany(GalleryUnit, {
  foreignKey: "unit_type",
  sourceKey: "unit_type",
  constraints: true,
});

UnitHomestay.hasMany(GalleryUnit, {
  foreignKey: "unit_number",
  sourceKey: "unit_number",
  constraints: true,
});
GalleryUnit.belongsTo(UnitHomestay, {
  foreignKey: "homestay_id",
  targetKey: "homestay_id",
  constraints: true,
  as: "galleryUnit",
});

GalleryUnit.belongsTo(UnitHomestay, {
  foreignKey: "unit_type",
  targetKey: "unit_type",
  constraints: true,
});

GalleryUnit.belongsTo(UnitHomestay, {
  foreignKey: "unit_number",
  targetKey: "unit_number",
});

FacilityUnitDetail.belongsTo(FacilityUnit, {
  foreignKey: "facility_unit_id",
  as: "unitFacility",
});
FacilityUnit.hasMany(FacilityUnitDetail, { foreignKey: "facility_unit_id" });

FacilityHomestayDetail.belongsTo(Homestay, {
  foreignKey: "homestay_id",
  as: "homestay",
});
FacilityHomestayDetail.belongsTo(FacilityHomestay, {
  foreignKey: "facility_homestay_id",
  as: "facility",
});
Homestay.hasMany(FacilityHomestayDetail, {
  foreignKey: "homestay_id",
  as: "details",
});
Homestay.hasMany(FacilityHomestayDetail, {
  foreignKey: "facility_homestay_id",
  as: "detail",
});

GalleryHomestay.belongsTo(Homestay, {
  foreignKey: "homestay_id",
  as: "homestay",
});
Homestay.hasMany(GalleryHomestay, {
  foreignKey: "homestay_id",
  as: "galleries",
});

Craft.hasMany(CraftVariant, {
  foreignKey: "id_craft",
  as: "variants",
});
CraftVariant.belongsTo(Craft, {
  foreignKey: "id_craft",
  as: "craft",
});

// ShippingAddress and Checkout associations
ShippingAddress.hasMany(Checkout, {
  foreignKey: "address_id",
  as: "checkouts",
});
ShippingAddress.hasMany(Checkout, {
  foreignKey: "customer_id",
  as: "usercheckouts",
});
Checkout.belongsTo(ShippingAddress, {
  foreignKey: "address_id",
  as: "shippingAddress",
});
Checkout.belongsTo(ShippingAddress, {
  foreignKey: "customer_id",
  as: "shippingCustomer",
});

// CraftVariant and ItemCheckout associations
CraftVariant.hasMany(DetailMarketplaceCraft, {
  foreignKey: "craft_variant_id",
  as: "crafts",
});

DetailMarketplaceCraft.belongsTo(CraftVariant, {
  foreignKey: "craft_variant_id",
  as: "variant",
});
DetailMarketplaceCraft.belongsTo(SouvenirPlace, {
  foreignKey: "id_souvenir_place",
  as: "souvenirPlace",
});

SouvenirPlace.hasMany(DetailMarketplaceCraft, {
  foreignKey: "id_souvenir_place",
  as: "crafts",
});

DetailMarketplaceCraft.hasMany(CraftVariantGallery, {
  foreignKey: "craft_variant_id",
  as: "craftGalleries",
});
DetailMarketplaceCraft.hasMany(CraftVariantGallery, {
  foreignKey: "id_souvenir_place",
  as: "souvenirPlaceGalleries",
});
CraftVariantGallery.belongsTo(SouvenirPlace, {
  foreignKey: "id_souvenir_place",
  as: "souvenirPlace",
});
CraftVariantGallery.belongsTo(DetailMarketplaceCraft, {
  foreignKey: "craft_variant_id",
  as: "craftVariant",
});

DetailMarketplaceCraft.hasMany(ItemCheckout, {
  foreignKey: "craft_variant_id",
  as: "items",
});
DetailMarketplaceCraft.hasMany(ItemCheckout, {
  foreignKey: "id_souvenir_place",
  as: "itemsBySouvenirPlace",
});

ItemCheckout.belongsTo(DetailMarketplaceCraft, {
  foreignKey: "craft_variant_id",
  as: "detailCraft",
});
ItemCheckout.belongsTo(DetailMarketplaceCraft, {
  foreignKey: "id_souvenir_place",
  as: "detailCraftBySouvenirPlace",
});

Checkout.hasMany(ItemCheckout, {
  foreignKey: "checkout_id",
  as: "items",
});

ItemCheckout.belongsTo(Checkout, {
  foreignKey: "checkout_id",
  as: "checkout",
});

ItemCheckout.hasMany(ItemCheckoutReviewGallery, {
  foreignKey: "checkout_id",
  as: "reviewGalleries",
});
ItemCheckout.hasMany(ItemCheckoutReviewGallery, {
  foreignKey: "craft_variant_id",
  as: "checkoutGalleries",
});
ItemCheckout.hasMany(ItemCheckoutReviewGallery, {
  foreignKey: "id_souvenir_place",
  as: "souvenirPlaceGalleries",
});

ItemCheckoutReviewGallery.belongsTo(ItemCheckout, {
  foreignKey: "checkout_id",
  as: "GalleryItemCheckout",
});
ItemCheckoutReviewGallery.belongsTo(ItemCheckout, {
  foreignKey: "craft_variant_id",
  as: "GalleryCraftVariantItemCheckout",
});
ItemCheckoutReviewGallery.belongsTo(ItemCheckout, {
  foreignKey: "id_souvenir_place",
  as: "GallerySouvenirPlaceItemCheckout",
});

Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });
Cart.belongsTo(Package, { foreignKey: "package_id", as: "package" });
User.hasMany(Cart, { foreignKey: "user_id", as: "userCart" });
Package.hasMany(Cart, { foreignKey: "package_id", as: "packageCart" });

User.hasMany(ShippingAddress, { foreignKey: "customer_id", as: "addresses" });
ShippingAddress.belongsTo(User, {
  foreignKey: "customer_id",
  as: "addressCustomer",
});

User.belongsTo(SouvenirPlace, {
  foreignKey: "id_souvenir_place",
  as: "souvenirPlace",
});

SouvenirPlace.hasMany(User, {
  foreignKey: "id_souvenir_place",
  as: "owners",
});

Shipping.hasMany(ItemCheckout, {
  foreignKey: "shipping_id",
  as: "shippingItems",
});

ItemCheckout.belongsTo(Shipping, { foreignKey: "shipping_id", as: "shipping" });
ItemCheckout.belongsTo(User, {
  foreignKey: "owner_responder_id",
  as: "owner",
});

User.hasMany(ItemCheckout, {
  foreignKey: "owner_responder_id",
  as: "responses",
});

User.belongsTo(Role, {
  foreignKey: "id_role",
  as: "role",
});

Role.hasMany(User, {
  foreignKey: "id_role",
  as: "users",
});

module.exports = {
  AuthGroup,
  AuthGroupUsers,
  User,
  Announcement,
  TourismVillage,
  GalleryTourism,
  Package,
  PackageDay,
  PackageType,
  ServicePackage,
  DetailPackage,
  FacilityType,
  Facility,
  DetailServicePackage,
  GalleryPackage,
  Reservation,
  Homestay,
  HomestayUnitType,
  UnitHomestay,
  DetailReservation,
  FacilityHomestayDetail,
  FacilityHomestay,
  Cart,
  FacilityUnitDetail,
  FacilityUnit,
  GalleryUnit,
  GalleryHomestay,
  Craft,
  CraftVariant,
  CraftVariantGallery,
  SouvenirPlace,
  ShippingAddress,
  Checkout,
  ItemCheckout,
  ItemCheckoutReviewGallery,
  Shipping,
  DetailMarketplaceCraft,
};
