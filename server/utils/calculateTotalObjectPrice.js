const { findObjects } = require("../src/object/object.repository");

async function calculateTotalObjectPrice(pricedObject) {
  const prices = await Promise.all(
    pricedObject.map(async (item) => {
      const object = await findObjects(item.activity_type, {
        id: item.object_id,
      });
      return object?.price || 0;
    })
  );
  return prices.reduce((acc, price) => acc + price, 0);
}

module.exports = { calculateTotalObjectPrice };
