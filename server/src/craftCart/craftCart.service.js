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

const createCraftCart = async (body) => {
  const condition = {
    user_id: body.user_id,
    craft_variant_id: body.craft_variant_id,
  };

  const craftCart = await getCraftCarts(condition); 
  if (craftCart.length > 0) {
    const updated = await editCraftCart(
      { craft_variant_id: craftCart[0].craft_variant_id,
        user_id: craftCart[0].user_id
      },
      {
        jumlah: body.jumlah + craftCart[0].jumlah,
      }
    );
    console.log("updated:", updated);
    return updated;
  }
  return await insertCraftCart(body);
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
