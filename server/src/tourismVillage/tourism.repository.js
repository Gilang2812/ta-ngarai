const { TourismVillage } = require("../../models/TourismVillageModel")

const findTourismById =  async (id)=>{
    const tourism = await TourismVillage.findByPk(id)
    return tourism
}

const editTourism =async (id,body)=>{  
    // const data=await findTourismById(id) 
    // const tourism =await data.update(body)
    console.log(body)
    return body
}

module.exports = {findTourismById,editTourism}