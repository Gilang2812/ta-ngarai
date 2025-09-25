const { CustomError } = require("../../utils/CustomError");
const { getIncompleteCheckout } = require("../checkout/checkout.service");
const {
  findDetailCraft,
} = require("../detailMarketplaceCraft/detailCraft.repository");
const {
  insertCraftCart,
  destroyCraftCart,
  findCraftCarts,
  editCraftCart,
  findCraftCart,
} = require("./craftCart.repository");

const getCraftCarts = async (key) => {
  const craftCart = await findCraftCarts(key);
  return craftCart;
};

const getCraftCart = async (key) => {
  const craftCart = await findCraftCart(key);
  if (!craftCart) {
    throw new Error("Craft Cart not found");
  }
  return craftCart;
};

const createCraftCart = async ({
  id_souvenir_place,
  craft_variant_id,
  jumlah,
  customer_id,
}) => {
  const checkout = await getIncompleteCheckout({ customer_id });
  const condition = {
    checkout_id: checkout.id,
    craft_variant_id,
    id_souvenir_place,
  };
  const existingItemCart = await findCraftCart(condition);
  const currenCraftItem = await findDetailCraft(
    {
      craft_variant_id,
      id_souvenir_place,
    },
    []
  );
  if (!currenCraftItem.stock || currenCraftItem.stock === 0) { 
    throw new CustomError("Out of Stocks", 400);
  }
  if (Number(jumlah) > Number(currenCraftItem.stock || 0)) {
    throw new CustomError("Stok tidak cukup", 400);
  }
  // Do something with currenCraftItem

  if (existingItemCart) {
    if (
      Number(existingItemCart.jumlah || 0) + jumlah >
      Number(currenCraftItem.stock || 0)
    ) {
      throw new CustomError(
        `Stock tidak cukup anda memiliki ${
          existingItemCart.jumlah
        } item di keranjang sehingga totalnya ${
          Number(existingItemCart.jumlah || 0) + jumlah
        }`,
        400
      );
    }
    await editCraftCart(
      {
        checkout_id: existingItemCart.checkout_id,
        id_souvenir_place: existingItemCart.id_souvenir_place,
      },
      {
        jumlah: existingItemCart.jumlah + jumlah,
      }
    );
    return existingItemCart;
  }
  return await insertCraftCart({
    id_souvenir_place,
    craft_variant_id,
    jumlah,
    checkout_id: checkout.id,
  });
};

const updateCraftCart = async (key, body) => {
  await getCraftCart(key);
  return await editCraftCart(key, body);
};

const deleteCraftCart = async (key) => {
  return await destroyCraftCart(key);
};

module.exports = {
  getCraftCarts,
  getCraftCart,
  createCraftCart,
  updateCraftCart,
  deleteCraftCart,
};
