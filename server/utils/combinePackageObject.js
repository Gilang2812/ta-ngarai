const { getObjectById } = require("../src/object/object.service");

const combinePackageObject = async (packages) => {
  return Promise.all(
    packages?.map(async (pkg) => {
      const enrichedDays = await Promise.all(
        (pkg?.packageDays || []).map(async (day) => {
          const enrichedDetails = await Promise.all(
            (day?.detailPackages || []).map(async (activity) => {
              const object = await getObjectById(
                activity.activity_type  ,
                activity.object_id
              );
              return { ...activity?.toJSON(), object };
            })
          );
          return { ...day?.toJSON(), detailPackages: enrichedDetails };
        })
      );
      return { ...pkg?.toJSON(), packageDays: enrichedDays };
    })
  );
};

module.exports = combinePackageObject;
