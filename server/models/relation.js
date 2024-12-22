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
const {Reservation} = require("./ReservationModel.js");
const { Homestay } = require("./HomestayModel.js");
const { UnitHomestay } = require("./UnitHomestayModel.js");
const { HomestayUnitType } = require("./HomestayUnitTypeModel.js");
const { DetailReservation } = require("./DetailReservationModel.js");
const { FacilityHomestayDetail } = require("./FacilityHomestayDetail.js");
const { FacilityHomestay } = require("./FacilityHomestay.js");
const { GalleryHomestay } = require("./GalleryHomestayModel.js");
const { Cart } = require("./CartModel.js");

User.hasMany(AuthGroupUsers, { foreignKey: "user_id", as: "user" });
AuthGroup.hasMany(AuthGroupUsers, { foreignKey: "group_id", as: "group" });

AuthGroupUsers.belongsTo(User, { foreignKey: "user_id", as: "user" });
AuthGroupUsers.belongsTo(User, { foreignKey: "group_id", as: "group" });

User.hasMany(Announcement, { foreignKey: "admin_id" });
Announcement.belongsTo(User, { foreignKey: "admin_id" });

TourismVillage.hasMany(GalleryTourism, {
    foreignKey: "tourism_village_id",
    as: "gallery",
});
GalleryTourism.belongsTo(TourismVillage, {
    foreignKey: "tourism_village_id",
    as: "gallery",
});

DetailPackage.belongsTo(PackageDay, {
    foreignKey: 'package_id',
    targetKey: 'package_id',
    as: 'packageDay',
});
DetailPackage.belongsTo(PackageDay, {
    foreignKey: 'day',
    targetKey: 'day',
    as: 'packageDayByDay',
});

PackageDay.hasMany(DetailPackage, {
    foreignKey: 'package_id',
    sourceKey: 'package_id',
as: 'detailPackages',
});

PackageDay.belongsTo(Package, {
    foreignKey: "package_id",
    as: "package",
});
Package.hasMany(PackageDay, {
    foreignKey: 'package_id',
    sourceKey: 'id',
    as: 'packageDays'
});
Package.hasMany(DetailServicePackage, { foreignKey: "package_id",as: "detailServices"});
ServicePackage.hasMany(DetailServicePackage, {
    foreignKey: "service_package_id",
});
DetailServicePackage.belongsTo(Package, { foreignKey: "package_id" });
DetailServicePackage.belongsTo(ServicePackage, {
    foreignKey: "service_package_id",
    as:'service'
});

PackageType.hasMany(Package, { foreignKey: "type_id" });
Package.belongsTo(PackageType, { foreignKey: "type_id" ,as: 'type' });

FacilityType.hasMany(Facility, { foreignKey: "type_id" });
Facility.belongsTo(FacilityType, { foreignKey: "type_id" });

GalleryPackage.belongsTo(Package, { foreignKey: "package_id" });
Package.hasMany(GalleryPackage, { foreignKey: "package_id", as: "packageGalleries" });

Reservation.belongsTo(User, { foreignKey: "user_id" ,as:"customer"});
Reservation.belongsTo(User, { foreignKey: "admin_confirm", as:"confirm" });
Reservation.belongsTo(User, { foreignKey: "admin_refund",as:"refund" });

User.hasMany(Reservation, { foreignKey: "user_id" });
User.hasMany(Reservation, { foreignKey: "admin_confirm" });
User.hasMany(Reservation, { foreignKey: "admin_refund" });

Reservation.belongsTo(Package, { foreignKey: "package_id", as:"package" });
Package.hasMany(Reservation, { foreignKey: "package_id", as:"reservation" });

Homestay.hasMany(UnitHomestay,{foreignKey: "homestay_id" })
HomestayUnitType.hasMany(UnitHomestay,{foreignKey: "unit_type" })

UnitHomestay.belongsTo(Homestay,{foreignKey: "homestay_id" })
UnitHomestay.belongsTo(HomestayUnitType,{foreignKey: "unit_type" })

Reservation.hasMany(DetailReservation,{foreignKey: "reservation_id" ,as:"detail" });
DetailReservation.belongsTo(Reservation,{foreignKey: "reservation_id",as:"reservation" });
UnitHomestay.hasMany(DetailReservation, {
    foreignKey: 'homestay_id',
    sourceKey: 'homestay_id',
    constraints: true,
    as: 'detailReservations'
});

UnitHomestay.hasMany(DetailReservation, {
    foreignKey: 'unit_type',
    sourceKey: 'unit_type',
    constraints: true,
});

UnitHomestay.hasMany(DetailReservation, {
    foreignKey: 'unit_number',
    sourceKey: 'unit_number',
    constraints: true,
});


DetailReservation.belongsTo(UnitHomestay, {
    foreignKey: 'homestay_id',
    targetKey: 'homestay_id',
    constraints: true,
    as: 'homestay'
});

DetailReservation.belongsTo(UnitHomestay, {
    foreignKey: 'unit_type',
    targetKey: 'unit_type',
    constraints: true,
    as: 'unit'

});

DetailReservation.belongsTo(UnitHomestay, {
    foreignKey: 'unit_number',
    targetKey: 'unit_number',
    constraints: true,
    as: 'number'
});


FacilityHomestayDetail.belongsTo(Homestay,{foreignKey: 'homestay_id', as: 'homestay'})
FacilityHomestayDetail.belongsTo(FacilityHomestay,{foreignKey: 'facility_homestay_id', as: 'facility'})
Homestay.hasMany(FacilityHomestayDetail,{foreignKey: 'homestay_id', as: 'details'})
Homestay.hasMany(FacilityHomestayDetail,{foreignKey: 'facility_homestay_id', as: 'detail'})

GalleryHomestay.belongsTo(Homestay, {foreignKey: 'homestay_id', as: 'homestay'});
Homestay.hasMany(GalleryHomestay,{foreignKey: 'homestay_id', as: 'galleries'});

Cart.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
Cart.belongsTo(Package, { foreignKey: 'package_id', as: 'package'});
User.hasMany(Cart, {foreignKey: 'user_id', as: 'userCart'})
Package.hasMany(Cart, {foreignKey: 'package_id', as: 'packageCart'});

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
    DetailReservation,
    FacilityHomestayDetail,
    FacilityHomestay,
    Cart,
};