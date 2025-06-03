const {
  getAddress,
  updateAddress,
  deleteAddress,
  createAddress,
} = require("./address.service");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const address = await getAddress({ customer_id: 1 }); // Assuming customer_id is 1 for testing purposes
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const {
      destination_id,
      label,
      recipient_name,
      recipient_phone,
      negara,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kode_post,
      street,
      details,
      is_primary,
    } = req.body;
    const customer_id = 1; // Assuming customer_id is 1 for testing purposes
    console.log(req.body);
    if (is_primary)
      await updateAddress({ is_primary: 1, customer_id: 1 }, { is_primary: 0 }); // Reset primary address for testing purposes
    const newAddress = await createAddress({
      customer_id,
      destination_id,
      label,
      recipient_name,
      recipient_phone,
      negara,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kode_post,
      street,
      details,
      is_primary,
    });
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      destination_id,
      label,
      recipient_name,
      recipient_phone,
      negara,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kode_post,
      street,
      details,
      is_primary,
    } = req.body;
    if (is_primary)
      await updateAddress({ is_primary: 1, customer_id: 1 }, { is_primary: 0 });
    const updatedAddress = await updateAddress(
      { id },
      {
        destination_id,
        label,
        recipient_name,
        recipient_phone,
        negara,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        kode_post,
        street,
        details,
        is_primary,
      }
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAddress = await deleteAddress(id);
    res.status(200).json(deletedAddress);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
