const { findTourismById } = require("./tourism.repository")

const getTourismById=async (id)=>{
    const tourism = await findTourismById(id)
    return tourism
} 

module.exports ={getTourismById}