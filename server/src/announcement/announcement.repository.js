const { Announcement } = require("../../models/relation");

const findAllAnnouncement = async (status) => {
  const whereCondition = status ? { where: status } : {};
  console.log(whereCondition);
  const allAnnouncement = await Announcement.findAll(whereCondition);
  return allAnnouncement;
};

const insertAnnouncement = async (body) => {
  console.log(body);
  const announcement = await Announcement.create(body);
  return announcement;
};

const findAnnouncementById = async (id) => {
  const announcement = await Announcement.findByPk(id);
  return announcement;
};

const updateAnnouncement = async (body) => {
  const announcement = await Announcement.update(body, {
    where: { id: body.id },
  });
  return announcement;
};

const deleteAnnouncement = async (id) => {
  const announcement = await Announcement.destroy({ where: { id } });
  return announcement;
};
module.exports = {
  findAllAnnouncement,
  insertAnnouncement,
  findAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
