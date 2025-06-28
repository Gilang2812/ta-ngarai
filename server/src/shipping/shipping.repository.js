const { Op } = require("sequelize");
const {
  Shipping,
  ItemCheckout,
  CraftVariant,
  Craft,
  SouvenirPlace,
  Checkout,
  ShippingAddress,
  User,
  CraftVariantGallery,
} = require("../../models/relation");

const findShippingById = async (shippingId) => {
  const shipping = await Shipping.findOne({
    where: { shipping_id: shippingId },
    include: [
      {
        model: ItemCheckout,
        required: true,
        as: "shippingItems",
        attributes: ["checkout_id", "craft_variant_id", "jumlah"],
        include: [
          {
            model: CraftVariant,
            as: "craftVariant",
            attributes: ["id", "id_craft", "name", "price"],
            include: [
              {
                model: Craft,
                as: "craft",
                attributes: ["id", "name"],
                include: [
                  {
                    model: SouvenirPlace,
                    as: "souvenirPlace",
                    attributes: ["id", "name"],
                  },
                ],
              },
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                limit: 1,
                attributes: ["id", "url"],
              },
            ],
          },
          {
            model: Checkout,
            as: "checkout",
            attributes: [
              "id",
              "address_id",
              "total_price",
              "status",
              "payment",
              "checkout_date",
            ],
            include: [
              {
                model: ShippingAddress,
                attributes: [
                  "id",
                  "customer_id",
                  "label",
                  "recipient_name",
                  "recipient_phone",
                  "street",
                  "kelurahan",
                  "kecamatan",
                  "kota",
                  "provinsi",
                  "negara",
                  "kode_post",
                ],
                as: "shippingAddress",
                include: [
                  {
                    model: User,
                    as: "addressCustomer",
                    attributes: ["id", "fullname"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    attributes: [
      "shipping_id",
      "shipping_no",
      "grand_total",
      "shipping_name",
      "shipping_type",
      "total_shipping_cost",
    ],
  });

  return shipping;
};

const insertShipping = async (body) => {
  console.log("body shipping", body);
  return Shipping.create(body);
};

const userHistory = async (condition) => {
  const shipping = await Shipping.findAll({
    include: [
      {
        model: ItemCheckout,
        required: true,
        as: "shippingItems",
        attributes: ["checkout_id", "craft_variant_id", "jumlah"],
        include: [
          {
            model: CraftVariant,
            as: "craftVariant",
            attributes: ["id", "id_craft", "name", "price"],
            include: [
              {
                model: Craft,
                as: "craft",
                attributes: ["id", "name"],
                include: [
                  {
                    model: SouvenirPlace,
                    as: "souvenirPlace",
                    attributes: ["id", "name"],
                  },
                ],
              },
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                limit: 1,
                attributes: ["id", "url"],
              },
            ],
          },
          {
            model: Checkout,
            as: "checkout",
            attributes: [
              "id",
              "address_id",
              "total_price",
              "status",
              "payment",
              "checkout_date",
            ],
            where: { status: { [Op.ne]: condition.status } },
            required: true,
            include: [
              {
                model: ShippingAddress,
                where: { customer_id: condition.customer_id },
                attributes: [
                  "id",
                  "customer_id",
                  "label",
                  "recipient_name",
                  "recipient_phone",
                  "street",
                  "kelurahan",
                  "kecamatan",
                  "kota",
                  "provinsi",
                  "negara",
                  "kode_post",
                ],
                required: true,
                as: "shippingAddress",
                include: [
                  {
                    model: User,
                    as: "addressCustomer",
                    attributes: ["id", "fullname"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    attributes: [
      "shipping_id",
      "shipping_no",
      "grand_total",
      "shipping_name",
      "shipping_type",
      "total_shipping_cost",
    ],
    limit: 10,
    offset: 0,
    subQuery: false,
  });
  if (!shipping) {
    throw new Error("User had no shipping history");
  }
  return shipping;
};

module.exports = {
  insertShipping,
  userHistory,
  userHistory,
  findShippingById,
};
