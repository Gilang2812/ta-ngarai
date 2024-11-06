const { findObjects } = require("./object.repository")

const getObjectById = async(object, id)=>{
    const objectById = await findObjects(object,{id})
    return objectById
}

module.exports = {getObjectById}