const { findUserCarts, deleteCart, insertCart } = require("./cart.repository");

const getCarts = async (id) => {
  const carts = await findUserCarts(id || {});
  return carts;
};

const createCart = async (body) => {
  const cart = await insertCart(body);
  return cart;
};

const deleteCartById = async (id) => {
  const cart = await deleteCart(id);
  return cart;
};
module.exports = { getCarts, deleteCartById,createCart };
