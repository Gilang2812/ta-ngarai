const { findHomestayFacilityById, findHomestayFacilities, insertHomestayFacility, findDetailHomestayFacilities, insertDetailHomestayFacility, destroyDetailHomestayFacility } = require("./homestayFacility.repository")

const getHomestayWithFacility =async (id)=>{
    const homestay = await findHomestayFacilityById(id)
    return homestay
}

const getHomestayFacilities = async ()=>{
    const facilities = await findHomestayFacilities()
    return facilities
}

const getDetailHomestayFacilities = async ()=>{
    const details = await findDetailHomestayFacilities()
    return details
}

const createHomestayFacility = async (body)=>{
    const newFacility = await insertHomestayFacility(body)
    return newFacility
}
const createDetailHomestayFacility = async (body) => { 
    const newDetailHomestayFacility = await insertDetailHomestayFacility(body)
    return newDetailHomestayFacility
}

const deleteDetailHomestayFacility = async (params)=>{
    const deleted = await destroyDetailHomestayFacility(params)
    return deleted
}
module.exports = {deleteDetailHomestayFacility,createDetailHomestayFacility, getHomestayWithFacility,getHomestayFacilities,createHomestayFacility,getDetailHomestayFacilities }