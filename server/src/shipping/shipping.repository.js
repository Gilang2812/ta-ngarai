const {Shipping} = require("../../models/relation");

const insertShipping = async(body)=>{
    return Shipping.create(body);
}

module.exports = {
    insertShipping,
};