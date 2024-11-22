const { Homestay } = require("../../models/HomestayModel")

const findHomestays = async ()=>{
    const homestays = await Homestay.findAll()
    return homestays
}

const findHomestayById = async (id)=>{
    const homestay = await Homestay.findByPk(id)
    return homestay
}

const insertHomestay = async (body)=>{
    await Homestay.sync();
    const newHomestay = await Homestay.create(body)
    return newHomestay
}
module.exports = {findHomestays, findHomestayById,insertHomestay}