const {ShippingAddress} = require("../../models/relation")

const findAddress = async (condition)=>{
    const address = await ShippingAddress.findAll({
        where:condition
    })
    return address;
}

const findAddressById = async (condition) => {
    const address = await ShippingAddress.findOne({
        where: condition,
    });
    return address;
}

const insertAddress = async (body) => {
    const address = await ShippingAddress.create(body);
    return address;
};

const editAddress = async (condition, body) => {
    const address = await ShippingAddress.update(body, {
        where: condition,
    });
    return address;
}

const destroyAddress = async (id) => {
    const address = await ShippingAddress.destroy({
        where: { address_id:id },
    });
    return address;
};

const findOneAddress = async (condition) => {
    const address = await ShippingAddress.findOne({
        where: condition,
    });
    return address;
};

const countAddress = async (condition) => {
    const count = await ShippingAddress.count({
        where: condition,
    });
    return count;
};

module.exports = {
    findAddress,
    findAddressById,
    insertAddress,
    editAddress,
    destroyAddress,
    findOneAddress,
    countAddress
};