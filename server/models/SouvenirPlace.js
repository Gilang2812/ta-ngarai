const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");
const { CustomError } = require("../utils/CustomError");
const fs = require("fs");
const SouvenirPlace = sequelize.define(
  "SouvenirPlace",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    open: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    geom: {
      type: DataTypes.GEOMETRY(),
      allowNull: true,
    },
  },
  {
    tableName: "souvenir_place",
    timestamps: false,
  }
);

SouvenirPlace.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("SP", SouvenirPlace, 5);
});

SouvenirPlace.beforeBulkDestroy(async (instaces) => {
  const { GallerySouvenir, DetailMarketplaceCraft } = require("./relation");

  const where = instaces.where;
  const count = await DetailMarketplaceCraft.count({
    where: {
      id_souvenir_place: where.id,
    },
  });
  console.log("count", count);
  if (count > 0) {
    throw new CustomError(
      `Cannot delete souvenir place with associated ${count} crafts`,
      404
    );
  }
  const galleries = await GallerySouvenir.findAll({
    where: { souvenir_place_id: where.id },
  });

  if (galleries.length > 0) {
    for (const image of galleries) {
      fs.unlinkSync(`public\\${image.url}`);
    }
  }

  await GallerySouvenir.destroy({
    where: { souvenir_place_id: where.id },
  });
});
module.exports = { SouvenirPlace };
