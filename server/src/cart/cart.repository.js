const { Cart, Package } = require("../../models/relation");

const findUserCarts = async (id) => {
  const carts = await Cart.findAll({
    where: {
      user_id: id,
    },
    include: {
      model: Package,
      as: "package",
      attributes: ["id", "name", "price"],
    },
  });
  return carts;
};

const findCart = async (condition) => {
  const cart = await Cart.findOne({
    where: condition,
  });
  return cart;
};

const insertCart = async (body) => {
  const cart = await Cart.create(body);
  return cart;
};

const deleteCart = async (id) => {
  const cart = await Cart.destroy({
    where: { id },
  });
  return cart;
};

module.exports = { findUserCarts, deleteCart, insertCart, findCart };
