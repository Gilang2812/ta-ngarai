const { CustomError } = require("../../utils/CustomError");
const {
  findUserCarts,
  deleteCart,
  insertCart,
  findCart,
} = require("./cart.repository");

const getCarts = async (id) => {
  const carts = await findUserCarts(id || {});
  return carts;
};

const createCart = async (body) => {
  const exisitingCart = await findCart({
    user_id: body.user_id,
    package_id: body.package_id,
  });
  if (exisitingCart) {
    throw new CustomError("Package already exists in your cart",400);
  }
  const cart = await insertCart(body);
  return cart;
};

const deleteCartById = async (id) => {
  const cart = await deleteCart(id);
  return cart;
};
module.exports = { getCarts, deleteCartById, createCart };
