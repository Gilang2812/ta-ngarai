const express = require("express");
const router = express.Router();
const {
  getDestination,
  calculateShipping,
  getUserHistoryById,
  courerRates,
  getAreas,
  trackOrder,
} = require("./shipping.service");

// GET /api/shipping/destination?keyword=...
router.get("/destination", async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const { data } = await getDestination({ keyword });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/maps/areas", async (req, res, next) => {
  try {
    const input = req.query.input;
    const data = await getAreas(input);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/tracking/:tracking_id", async (req, res, next) => {
  try {
    const { tracking_id } = req.params;
    const data = await trackOrder(tracking_id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/shipping/calculate?shipper_id=...&...
router.get("/calculate", async (req, res) => {
  try {
    const { data } = await calculateShipping(req.query);

    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const shipping = await getUserHistoryById(id);
    return res.json(shipping);
  } catch (err) {
    next(err);
  }
});

router.post("/store", async (req, res) => {
  try {
    const {
      order_data,
      brand_name,
      shipper_name,
      shipper_phone,
      shipper_destination_id,
      shipper_address,
      shipper_email,
      receiver_name,
      receiver_phone,
      receiver_destination_id,
      receiver_address,
      shipping,
      shipping_type,
      payment_method,
      shipping_cost,
      shipping_cashback,
      service_fee,
      additional_cost,
      grand_total,
      cod_value,
      insurance_value,
      order_details,
    } = req.body;

    //     {
    //     "order_date": "2024-10-28 23:59:59",
    //     "brand_name": "Komship",
    //     "shipper_name": "Toko Official Komship",
    //     "shipper_phone": "6281234567689",
    //     "shipper_destination_id": 17588,
    //     "shipper_address": "order address detail",
    //     "shipper_email": "[test@gmail.com](mailto:test@gmail.com)",
    //     "receiver_name": "Buyer A",
    //     "receiver_phone": "628123456789",
    //     "receiver_destination_id": 17589,
    //     "receiver_address": "order destination address detail",
    //     "shipping": "JNT",
    //     "shipping_type": "EZ",
    //     "payment_method": "COD",
    //     "shipping_cost": 22000,
    //     "shipping_cashback": 10000,
    //     "service_fee": 2500,
    //     "additional_cost": 1000,
    //     "grand_total": 317000,
    //     "cod_value": 317000,
    //     "insurance_value": 1000,
    //     "order_details": [
    //         {
    //             "product_name": "Komship package",
    //             "product_variant_name": "Komship variant product",
    //             "product_price": 500000,
    //             "product_weight": 5100,
    //             "qty": 1,
    //             "subtotal": 500000
    //         }
    //     ]
    // }
    const { data } = await storeShipment({
      order_data,
      brand_name,
      shipper_name,
      shipper_phone,
      shipper_destination_id,
      shipper_address,
      shipper_email,
      receiver_name,
      receiver_phone,
      receiver_destination_id,
      receiver_address,
      shipping,
      shipping_type,
      payment_method,
      shipping_cost,
      shipping_cashback,
      service_fee,
      additional_cost,
      grand_total,
      cod_value,
      insurance_value,
      order_details,
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

router.get("/courier/index", async (req, res, next) => {
  try {
    const { origin_area_id, destination_area_id, couriers } = req.query;
    let items = req.query.items;
    // Validate required parameters
    const isValid =
      !origin_area_id ||
      !destination_area_id ||
      !couriers ||
      items.length === 0;
    if (isValid) {
      return res.status(400).json({
        message:
          "Missing required parameters: origin_area_id, destination_area_id, and couriers are required",
      });
    }

    items =
      items?.map((item) => {
        return {
          name: item.name,
          value: item.value,
          weight: item.weight,
          quantity: item.quantity,
        };
      }) || [];
    const request = {
      origin_area_id,
      destination_area_id,
      couriers,
      items,
    };
    const data = await courerRates(request);

    res.json(data.pricing);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
