const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryTraditional = sequelize.define(
    "GalleryTraditional",
    {
        id: {
            type: DataTypes.STRING(5),
            primaryKey: true,
            allowNull: true,
        },
        traditional_house_id: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "gallery_traditional_house",
        timestamps: false,
    }
);

GalleryTraditional.beforeCreate(async (gallery) => {
    const id = await generateCustomId("GT", GalleryTraditional, 5);
 
    gallery.id = id;
});

module.exports = { GalleryTraditional };
