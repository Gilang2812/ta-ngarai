const { Op } = require("sequelize");
const { CustomError } = require("../../utils/CustomError");
const { getOneAddress, getUserAddress } = require("../address/address.service");
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
const {
  findDetailCraft,
} = require("../detailMarketplaceCraft/detailCraft.repository");

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

const getIncompleteCheckout = async ({
  customer_id,
  checkout_date = null,
  isCheckout = false,
}) => {
  let existingCheckout = await getCheckout({
    customer_id,
    checkout_date: isCheckout ? { [Op.not]: null } : checkout_date,
    transaction_token: null,
  });

  if (!existingCheckout) {
    console.log("dont exist");
    const address = await getUserAddress({ customer_id });
    if (!address) {
      throw new CustomError("complete your address first ", 400);
    }
    console.log("address checkout", address);
    console.log("customer_id checkout", customer_id);
    existingCheckout = await createCheckout({
      address_id: address?.address_id ?? null,
      customer_id,
      checkout_date: isCheckout ? new Date() : null,
    });
  }
  console.log("new existing checkout", existingCheckout);
  return existingCheckout;
};

const checkoutOrder = async (body, customer_id) => {
  let existingCheckout = await getIncompleteCheckout({
    customer_id,
    isCheckout: true,
  });
  await deleteItemsCheckout({ checkout_id: existingCheckout.id });
  const newItems = await Promise.all(
    body.map(async (item) => {
      const { craft_variant_id, id_souvenir_place } = item;
      const currenCraftItem = await findDetailCraft(
        { craft_variant_id, id_souvenir_place },
        []
      );
      if (!currenCraftItem.stock || currenCraftItem.stock === 0) {
        throw new CustomError("Out of Stocks", 400);
      }
      if (Number(item.jumlah) > Number(currenCraftItem.stock || 0)) {
        throw new CustomError("Stock tidak cukup", 400);
      }
      if (item.checkout_id) {
        const updated = await updateItemsCheckout(
          {
            checkout_id: item.checkout_id,
            id_souvenir_place: item.id_souvenir_place,
            craft_variant_id: item.craft_variant_id,
          },
          {
            checkout_id: existingCheckout.id,
          }
        );
        return updated;
      }
      return createItemCheckouts([
        {
          checkout_id: existingCheckout.id,
          id_souvenir_place: item.id_souvenir_place,
          craft_variant_id: item.craft_variant_id,
          jumlah: item.jumlah,
        },
      ]);
    })
  );
  console.log("newItems", newItems);
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
  getIncompleteCheckout,
  getUserHistory,
};
