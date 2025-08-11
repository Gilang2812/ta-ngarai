const { GalleryTourism, TourismVillage } = require("../../models/relation");

const findTourismById = async (id) => {
  const tourism = await TourismVillage.findOne({
    where: { id },
    include: [
      {
        model: GalleryTourism,
        as: "galleries",
      },
    ],
  });
  return tourism;
};

const updateTourism = async (id, body) => {
  const [updated] = await TourismVillage.update(body, {
    where: { id: id },
  });

  return updated;
};
const deleteTourism = async (id) => {
  const tourism = await findTourismById(id);
  if (tourism) {
    await tourism.destroy();
  }
  return tourism;
};

const insertGallery = async (galleryData) => {
  console.log("test repository");
  return await GalleryTourism.create(galleryData);
};

const deleteGalleryByAtribut = async (attributes) => {
  return await GalleryTourism.destroy({
    where: attributes,
  });
};

module.exports = {
  findTourismById,
  updateTourism,
  deleteTourism,
  insertGallery,
  deleteGalleryByAtribut,
};
