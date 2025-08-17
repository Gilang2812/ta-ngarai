const { CustomError } = require("../../utils/CustomError");
const {
  findAddressById,
  findAddress,
  editAddress,
  destroyAddress,
  findOneAddress,
  countAddress,
  insertAddress,
} = require("./address.repository");

const getAddress = async (condition) => {
  const address = await findAddress(condition);

  return address;
};

const getOneAddress = async (condition) => {
  const address = await findOneAddress(condition);
  return address;
};

const getUserAddress = async ({ customer_id }) => {
  let address = await getOneAddress({ customer_id, is_primary: 1 });
  if (!address) {
    address = await getOneAddress({ customer_id, is_primary: 0 });
  }

  return address;
};

const getAddressById = async (condition) => {
  const address = await findAddressById(condition);
  if (!address) {
    throw new CustomError("Address not found", 404);
  }
  return address;
};

const createAddress = async (body) => {
  const address = await findAddressById(body);
  const userAddress = await countUserAddress({
    customer_id: body.customer_id,
  });
  if (userAddress >= 10) {
    throw new CustomError("You can only have up to 10 addresses", 400);
  }
  if (address) {
    throw new CustomError("Address already exists", 400);
  }

  const newAddress = await insertAddress(body);
  return newAddress;
};

const updateAddress = async (condition, body) => {
  const updatedAddress = await editAddress(condition, body);
  return updatedAddress;
};

const deleteAddress = async (id) => {
  await getAddressById({ id });

  const deletedAddress = await destroyAddress(id);
  return deletedAddress;
};

const countUserAddress = async (condition) => {
  const count = await countAddress(condition);
  return count;
};

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  getOneAddress,
  countUserAddress,
  getUserAddress,
};
