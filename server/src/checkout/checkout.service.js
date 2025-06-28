const { CustomError } = require("../../utils/CustomError");
const { getOneAddress } = require("../address/address.service");
const {
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
} = require("./checkout.repository");

const getCheckout = async (key) => {
  const checkout = await findCheckout(key);
  return checkout;
};

const takeCheckout = async (key) => {
  const checkout = await findCheckout(key);
  if (!checkout) {
    throw new CustomError("Checkout not found", 404);
  }
  return checkout;
};

const getCheckouts = async (key) => {
  return findCheckouts(key);
};
const createCheckout = async (body) => {
  return insertCheckout(body);
};
const updateCheckout = async (key, body) => {
  await takeCheckout(key);
  return editCheckout(key, body);
};
const deleteCheckout = async (condition) => {
  return destroyCheckout(condition);
};

const createItemCheckouts = async (items) => {
  const checkout = await insertItemCheckouts(items);
  return checkout;
};

const getUserCheckouts = async (condition) => {
  const checkout = await findUserCheckouts(condition);
  if (!checkout) {
    throw new CustomError("User had no checkouts", 404);
  }
  return checkout;
};

const deleteItemsCheckout = async (condition) => {
  const items = destroyItemsCheckout(condition);
  return items;
};

const updateItemsCheckout = async (key, body) => {
  const checkout = await editItemsCheckout(key, body);

  return checkout;
};

const checkoutOrder = async (body) => {
  let address = await getOneAddress({ is_primary: 1, customer_id: 1 }); // Assuming customer_id is 1 for testing purposes
  if (!address) {
    address = await getOneAddress({ is_primary: 0, customer_id: 1 }); // Assuming customer_id is 1 for testing purposes
    if (!address) {
      return res
        .status(404)
        .json({ message: "user does not set the address yet" });
    }
  }

  let existingCheckout = await getCheckout({ checkout_date: null });

  if (!existingCheckout) {
    existingCheckout = await getCheckout({ payment_date: null });
    if (existingCheckout && existingCheckout.checkout_date) {
      const oneDay = 24 * 60 * 60 * 1000;
      const currentTime = new Date();
      const checkoutTime = new Date(existingCheckout.checkout_date);
      if (currentTime - checkoutTime > oneDay) {
        existingCheckout.status = 3;
        await existingCheckout.save();
      }
    }
    existingCheckout = await createCheckout({ address_id: address.id });
  }

  await deleteItemsCheckout({ checkout_id: existingCheckout.id });

  const newItems = await createItemCheckouts(
    body.map((item) => ({
      craft_variant_id: item.craft_variant_id,
      jumlah: item.jumlah,
      checkout_id: existingCheckout.id,
    }))
  );
  return newItems;
};

const getUserHistory = async (condition) => {
  const checkout = await userHistory(condition);

  return checkout;
};

module.exports = {
  getCheckout,
  getCheckouts,
  createCheckout,
  takeCheckout,
  updateCheckout,
  deleteCheckout,
  createItemCheckouts,
  getUserCheckouts,
  deleteItemsCheckout,
  updateItemsCheckout,
  checkoutOrder,
  getUserHistory
};
