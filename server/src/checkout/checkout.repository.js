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
} = require("../../models/relation");
const {
  include,
} = require("../detailReservation/detailReservation.repository");

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
  });
};

const findUserCheckouts = async (condition) => {
  const checkout = await Checkout.findOne({
    where: { status: condition.status },
    include: [
      {
        model: ShippingAddress,
        as: "shippingAddress",
        where: { customer_id: condition.customer_id },
        include: {
          model: User,
          as: "addressCustomer",
          attributes: ["id", "fullname", "email", "phone"],
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
            model: CraftVariant,
            as: "craftVariant",
            attributes: ["id", "name", "price", "weight"],
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
  console.log("key", key);
  console.log("body", body);
  return ItemCheckout.update(body, {
    where: key,
  });
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
  editItemsCheckout
};
