 
const { CustomError } = require('../../utils/CustomError')
const { findHomestays, findHomestayById, insertHomestay } = require('./homestay.repository')
const getAllHomestay =  ()=>{
    const allHomestay = findHomestays()
    return allHomestay
}

const getHomestay = async (id) => {
    const homestay =await findHomestayById(id)
    if(!homestay) {
        throw new CustomError('homestay is not exists', 400)
    }
    return homestay
}

const existsHomestay = async (id) => {
    const homestay = await findHomestayById(id)
    if(homestay) {
        throw new CustomError('homestay already exists', 400)
    }
    return homestay
}
const createHomestay = async (body) => {
    await existsHomestay(body.id)
    const newHomestay = await insertHomestay(body)
    return newHomestay
}

module.exports = {getAllHomestay,getHomestay,createHomestay}