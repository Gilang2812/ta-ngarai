const  {Homestay} = require('../../models/HomestayModel')
const getAllHomestay =  ()=>{
    const allHomestay = Homestay.findAll()
    return allHomestay
}

const getHomestay = async (id) => {
    const homestay =await Homestay.findByPk(id)

    return homestay
}
module.exports = {getAllHomestay,getHomestay}