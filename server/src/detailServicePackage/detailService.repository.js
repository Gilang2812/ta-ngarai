const { DetailServicePackage, ServicePackage } = require("../../models/relation")

const findAllService = async (conditions) => {
    console.log(conditions)
    const detailServices = await DetailServicePackage.findAll({
        include:[{
            model: ServicePackage
        }],
        where:conditions,
        attributes:['package_id', 'status', 'status_created' , 'service_package_id'  ],
    })
    return detailServices
}

module.exports = {findAllService}

