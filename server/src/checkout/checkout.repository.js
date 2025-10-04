const { Op, and, col, where, literal } = require("sequelize");
const sequelize = require("../../config/database");
const {
  Checkout,
  ItemCheckout,
  CraftVariant,
  ShippingAddress,
  User,
  Craft,
  CraftVariantGallery,
  SouvenirPlace,
  Shipping,
  DetailMarketplaceCraft,
} = require("../../models/relation");

const {
  buildIncludeModels,
} = require("../detailMarketplaceCraft/detailCraft.utils");

const insertCheckout = async (body) => {
  return Checkout.create(body);
};

const destroyCheckout = async (key) => {
  return Checkout.destroy({
    where: key,
  });
};

const findCheckouts = async (key) => {
  return Checkout.findAll({
    where: key,
  });
};

const editCheckout = async (key, body) => {
  return Checkout.update(body, {
    where: key,
  });
};

const findCheckout = async (key) => {
  return Checkout.findOne({
    where: key,
    include: [
      {
        model: ItemCheckout,
        as: "items",
        include: [
          {
            model: Shipping,
            as: "shipping",
          },
          {
            model: DetailMarketplaceCraft,
            as: "detailCraft",
            on: literal(
              "`items`.`craft_variant_id` = `items->detailCraft`.`craft_variant_id` AND " +
                "`items`.`id_souvenir_place` = `items->detailCraft`.`id_souvenir_place`"
            ),
            include: [
              {
                model: CraftVariant,
                as: "variant",
                include: [
                  {
                    model: Craft,
                    as: "craft",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
};

const findUserCheckouts = async (condition) => {
  const include = buildIncludeModels(["craft"]);
  const checkout = await Checkout.findOne({
    where: {
      checkout_date: { [Op.ne]: null },
      transaction_token: null,

      customer_id: condition.customer_id,
    },
    include: [
      {
        model: ShippingAddress,
        as: "shippingAddress",
        include: {
          model: User,
          as: "addressCustomer",
          attributes: ["id", "fullname", "email", "username", "phone"],
          include: [
            {
              model: ShippingAddress,
              as: "addresses",
            },
          ],
        },
      },
      {
        model: ItemCheckout,
        as: "items",

        include: [
          {
            model: DetailMarketplaceCraft,
            as: "detailCraft",
            on: literal(
              "`items`.`craft_variant_id` = `items->detailCraft`.`craft_variant_id` AND " +
                "`items`.`id_souvenir_place` = `items->detailCraft`.`id_souvenir_place`"
            ),
            include: [
              ...include,
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                attributes: [
                  "id",
                  "craft_variant_id",
                  "id_souvenir_place",
                  "url",
                ],
                where: and(
                  where(
                    col(
                      "`items->detailCraft->craftGalleries`.craft_variant_id"
                    ),
                    col("`items->detailCraft`.craft_variant_id")
                  ),
                  where(
                    col(
                      "`items->detailCraft->craftGalleries`.id_souvenir_place"
                    ),
                    col("`items->detailCraft`.id_souvenir_place")
                  )
                ),
                required: false,
              },
              {
                model: SouvenirPlace,
                as: "souvenirPlace",
                attributes: [
                  "id",
                  "destination_id",
                  "name",
                  "address",
                  "contact_person",
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  return checkout;
};
const insertItemCheckouts = async (items) => {
  const transaction = await sequelize.transaction();
  try {
    const result = await ItemCheckout.bulkCreate(items, {
      transaction,
      updateOnDuplicate: ["jumlah"],
    });
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const destroyItemsCheckout = async (condition) => {
  const items = await ItemCheckout.destroy({ where: condition });
  return items;
};

const editItemsCheckout = async (key, body) => {
  const [affectedRows] = await ItemCheckout.update(body, {
    where: key,
  });
  return affectedRows;
};

const userHistory = async (condition) => {
  const checkout = await Checkout.findAll({
    where: { checkout_date: { [Op.ne]: null } },
    include: [
      // {
      //   model: ShippingAddress,
      //   as: "shippingAddress",
      //   where: { customer_id: condition.customer_id },
      //   include: {
      //     model: User,
      //     as: "addressCustomer",
      //     attributes: ["id", "fullname", "email", "phone"],
      //     include: [
      //       {
      //         model: ShippingAddress,
      //         as: "addresses",
      //       },
      //     ],
      //   },
      // },
      {
        model: ItemCheckout,
        as: "items",
        include: [
          {
            model: CraftVariant,
            as: "craftVariant",
            attributes: ["id", "name", "id_craft"],
            include: [
              {
                model: Craft,
                as: "craft",
                attributes: ["id", "name", "id_souvenir_place"],
                include: [
                  {
                    model: SouvenirPlace,
                    as: "souvenirPlace",
                    attributes: ["id", "name", "address", "contact_person"],
                  },
                ],
              },
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                limit: 1,
              },
            ],
          },
          {
            model: Shipping,
            as: "shipping",
          },
        ],
      },
    ],
  });
  return checkout;
};

module.exports = {
  insertCheckout,
  destroyCheckout,
  findCheckouts,
  editCheckout,
  findCheckout,
  insertItemCheckouts,
  findUserCheckouts,
  destroyItemsCheckout,
  editItemsCheckout,
  userHistory,
};
