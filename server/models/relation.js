const { Announcement } = require("./AnnouncementModel");
const { AuthGroup } = require("./AuthGroupModel");
const { AuthGroupUsers } = require("./AuthGroupUsers");
const { GalleryTourism } = require("./GalleryTourismModel");
const { TourismVillage } = require("./TourismVillageModel");
const { User } = require("./UsersModels");

User.hasMany(AuthGroupUsers, {foreignKey:'user_id', as:'user'})
AuthGroup.hasMany(AuthGroupUsers, {foreignKey:'group_id',as:'group'  
    
})

AuthGroupUsers.belongsTo(User, {foreignKey:'user_id',as:'user'})
AuthGroupUsers.belongsTo(User, {foreignKey:'group_id',as:'group'});

User.hasMany(Announcement,{foreignKey:"admin_id"})
Announcement.belongsTo(User,{foreignKey:"admin_id"})

TourismVillage.hasMany(GalleryTourism,{foreignKey:"tourism_village_id",as:"gallery"})
GalleryTourism.belongsTo(TourismVillage,{foreignKey:"tourism_village_id",as:"gallery"})

module.exports = { AuthGroup, AuthGroupUsers, User,Announcement,TourismVillage,GalleryTourism };