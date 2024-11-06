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
  constraints: false
});
DetailPackage.belongsTo(PackageDay, {
  foreignKey: 'day',
  targetKey: 'day',
  as: 'packageDayByDay',
  constraints: false
});

PackageDay.hasMany(DetailPackage, {
  foreignKey: 'package_id',
  sourceKey: 'package_id',
  as: 'detailPackages',
  scope: { day: Sequelize.col('PackaDetageDay.day') }  
});


PackageDay.hasMany(DetailPackage, {
  foreignKey: "day",
  as: "detailsByDay",
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
Package.hasMany(DetailServicePackage, { foreignKey: "package_id" });
ServicePackage.hasMany(DetailServicePackage, {
  foreignKey: "service_package_id",
});
DetailServicePackage.belongsTo(Package, { foreignKey: "package_id" });
DetailServicePackage.belongsTo(ServicePackage, {
  foreignKey: "service_package_id",
});

PackageType.hasMany(Package, { foreignKey: "type_id" });
Package.belongsTo(PackageType, { foreignKey: "type_id" });

FacilityType.hasMany(Facility, { foreignKey: "type_id" });
Facility.belongsTo(FacilityType, { foreignKey: "type_id" });

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
};
