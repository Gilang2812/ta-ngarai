const { TourismVillage } = require("../../models/TourismVillageModel")

const findTourismById =  async (id)=>{
    const tourism = await TourismVillage.findByPk(id)
    return tourism
}

module.exports = {findTourismById}