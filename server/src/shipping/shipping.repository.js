const { Op, literal } = require("sequelize");
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
  ItemCheckoutReviewGallery,
  DetailMarketplaceCraft,
} = require("../../models/relation");
const { Literal } = require("sequelize/lib/utils");
const {
  buildIncludeModels,
} = require("../detailMarketplaceCraft/detailCraft.utils");

const findShippingById = async (shippingId) => {
  const include = buildIncludeModels(["craft", "souvenirPlace"]);
  const shipping = await Shipping.findOne({
    where: { shipping_id: shippingId },
    include: [
      {
        model: ItemCheckout,
        required: true,
        as: "shippingItems",
        attributes: [
          "checkout_id",
          "id_souvenir_place",
          "craft_variant_id",
          "jumlah",
          "review_text",
          "shipping_id",
          "review_date",
          "review_rating",
          "seller_response",
        ],
        include: [
          {
            model: DetailMarketplaceCraft,
            as: "detailCraft",
            attributes: ["craft_variant_id", "id_souvenir_place", "price"],
            include: [
              ...include,
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                attributes: [
                  "id",
                  "craft_variant_id",
                  "id_souvenir_place",
                  "url",
                ],
              },
            ],
          },
          {
            model: ItemCheckoutReviewGallery,
            as: "reviewGalleries",
          },
          {
            model: Checkout,
            as: "checkout",
            attributes: [
              "id",
              "customer_id",
              "address_id",
              "total_price",
              "payment",
              "checkout_date",
            ],
            include: [
              {
                model: ShippingAddress,
                attributes: [
                  "address_id",
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
      "status",
    ],
  });

  return shipping;
};

const insertShipping = async (body) => { 
  return Shipping.create(body);
};

const userHistory = async ({ shipping_id = null, customer_id = null }) => {
  const shipping = await Shipping.findAll({
    order: [["shippingItems", "checkout", "checkout_date", "DESC"]],
    include: [
      {
        model: ItemCheckout,
        where: shipping_id
          ? {
              shipping_id,
            }
          : {},
        required: true,
        as: "shippingItems",
        attributes: [
          "checkout_id",
          "craft_variant_id",
          "id_souvenir_place",
          "jumlah",
          "review_text",
          "shipping_id",
          "review_date",
          "review_rating",
          "seller_response",
        ],
        include: [
          {
            model: DetailMarketplaceCraft,
            as: "detailCraft",
            on: literal(
              "`shippingItems`.`craft_variant_id` = `shippingItems->detailCraft`.`craft_variant_id` AND `shippingItems`.`id_souvenir_place` = `shippingItems->detailCraft`.`id_souvenir_place`"
            ),
            include: [
              {
                model: CraftVariant,
                as: "variant",
                attributes: ["id", "id_craft", "name"],
                include: [
                  {
                    model: Craft,
                    as: "craft",
                    attributes: ["id", "name"],
                  },
                ],
              },
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                on: literal(
                  "`shippingItems`.`craft_variant_id` = `shippingItems->detailCraft->craftGalleries`.`craft_variant_id` AND `shippingItems`.`id_souvenir_place` = `shippingItems->detailCraft->craftGalleries`.`id_souvenir_place`"
                ),
                attributes: [
                  "id",
                  "craft_variant_id",
                  "id_souvenir_place",
                  "url",
                ],
              },
              {
                model: SouvenirPlace,
                as: "souvenirPlace",
                attributes: ["id", "name", "address", "contact_person"],
              },
            ],
          },
          {
            model: Checkout,
            as: "checkout",
            attributes: [
              "id",
              "customer_id",
              "address_id",
              "total_price",
              "payment",
              "checkout_date",
              "transaction_token",
            ],
            where: {
              ...(customer_id ? { customer_id: customer_id } : {}),
              checkout_date: { [Op.ne]: null },
            },
            required: true,
            include: [
              {
                model: ShippingAddress,

                attributes: [
                  "address_id",
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
      "status",
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
const findSouvenirTransaction = async ({ id_souvenir_place = null } = {}) => {
  const shipping = await Shipping.findAll({
    order: [["shippingItems", "checkout", "checkout_date", "DESC"]],
    include: [
      {
        model: ItemCheckout,
        where: id_souvenir_place
          ? {
              id_souvenir_place,
            }
          : {},
        required: true,
        as: "shippingItems",
        attributes: [
          "checkout_id",
          "craft_variant_id",
          "id_souvenir_place",
          "jumlah",
          "review_text",
          "shipping_id",
          "review_date",
          "review_rating",
          "seller_response",
        ],
        include: [
          {
            model: DetailMarketplaceCraft,
            as: "detailCraft",
            on: literal(
              "`shippingItems`.`craft_variant_id` = `shippingItems->detailCraft`.`craft_variant_id` AND `shippingItems`.`id_souvenir_place` = `shippingItems->detailCraft`.`id_souvenir_place`"
            ),
            include: [
              {
                model: CraftVariant,
                as: "variant",
                attributes: ["id", "id_craft", "name"],
                include: [
                  {
                    model: Craft,
                    as: "craft",
                    attributes: ["id", "name"],
                  },
                ],
              },
              {
                model: CraftVariantGallery,
                as: "craftGalleries",
                on: literal(
                  "`shippingItems`.`craft_variant_id` = `shippingItems->detailCraft->craftGalleries`.`craft_variant_id` AND `shippingItems`.`id_souvenir_place` = `shippingItems->detailCraft->craftGalleries`.`id_souvenir_place`"
                ),
                attributes: [
                  "id",
                  "craft_variant_id",
                  "id_souvenir_place",
                  "url",
                ],
              },
              {
                model: SouvenirPlace,
                as: "souvenirPlace",
                attributes: ["id", "name", "address", "contact_person"],
              },
            ],
          },
          {
            model: Checkout,
            as: "checkout",
            attributes: [
              "id",
              "customer_id",
              "address_id",
              "total_price",
              "payment",
              "checkout_date",
              "transaction_token",
            ],
            where: { checkout_date: { [Op.ne]: null } },
            required: true,
            include: [
              {
                model: ShippingAddress,

                attributes: [
                  "address_id",
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
          {
            model: ItemCheckoutReviewGallery,
            as: "reviewGalleries",
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
      "status",
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

const editShipping = async (key, body) => {
  return Shipping.update(body, {
    where: key,
  });
};
module.exports = {
  insertShipping,
  userHistory,
  userHistory,
  findShippingById,
  editShipping,
  findSouvenirTransaction,
};
