const { Announcement } = require("./AnnouncementModel");
const { AuthGroup } = require("./AuthGroupModel");
const { AuthGroupUsers } = require("./AuthGroupUsers");
const { User } = require("./UsersModels");

User.hasMany(AuthGroupUsers, {foreignKey:'user_id', as:'user'})
AuthGroup.hasMany(AuthGroupUsers, {foreignKey:'group_id',
    as:'group'  // Optional: custom name for the association
    
})

AuthGroupUsers.belongsTo(User, {foreignKey:'user_id',as:'user'})
AuthGroupUsers.belongsTo(User, {foreignKey:'group_id',as:'group'});

User.hasMany(Announcement,{foreignKey:"admin_id"})
Announcement.belongsTo(User,{foreignKey:"admin_id"})

module.exports = { AuthGroup, AuthGroupUsers, User,Announcement };