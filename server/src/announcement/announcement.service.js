const { CustomBulkError } = require("../../utils/CustomError");
const { findAllAnnouncement, insertAnnouncement, findAnnouncementById, updateAnnouncement, deleteAnnouncement } = require("./announcement.repository")

const getAllAnnouncements =async (status)=>{
    console.log('ini service',status);

    const announcements = await findAllAnnouncement(status)
    return announcements
}
const getAnnouncementById = async (id)=>{
    const announcement = await findAnnouncementById(id)
    console.log(announcement)
    if(!announcement) {
        throw new Error('Announcement not found')
    }
    return announcement
}
const createAnnouncement = async (body)=>{
    let error = {}

    const existingId = await findAnnouncementById(body.id)
    if(existingId) {
        error.id = 'id already exists'
    }

    if(Object.keys(error).length > 0) {
        throw new CustomBulkError(error, 400)
    }
    const announcement = await insertAnnouncement(body)
    return announcement
} 

const editAnnouncementById = async (body)=>{
    await getAnnouncementById(body.id)
   const announcement = await updateAnnouncement(body)
   return announcement
}

const deleteAnnouncementById = async (id)=>{
    await getAnnouncementById(id)
    const announcement = await deleteAnnouncement(id)
    return announcement
}

module.exports = {getAllAnnouncements,createAnnouncement,getAnnouncementById,editAnnouncementById,deleteAnnouncementById}