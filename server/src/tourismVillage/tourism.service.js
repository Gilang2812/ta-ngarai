const { findTourismById, editTourism } = require("./tourism.repository")

const getTourismById=async (id)=>{
    const tourism = await findTourismById(id)
    if(!tourism){
        throw new Error(`Tourism with id ${id} not found`)
    }
    return tourism
} 

const editTourismById = async (id,body)=>{
    await getTourismById(id)
    
    const tourism = await editTourism(id, body)
    return tourism
}


module.exports ={getTourismById,editTourismById}