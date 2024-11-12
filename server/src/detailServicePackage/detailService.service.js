const { findAllService } = require("./detailService.repository")

const getAllService = async (condition) => {
    const services = await findAllService(condition)
    return services
}

module.exports = { getAllService }