const { CustomBulkError } = require("../../utils/CustomError");
const { findAllAnnouncement, insertAnnouncement, findAnnouncementById, updateAnnouncement, deleteAnnouncement } = require("./announcement.repository")

const getAllAnnouncements =async (status)=>{ 

    const announcements = await findAllAnnouncement(status)
    return announcements
}
const getAnnouncementById = async (id)=>{
    const announcement = await findAnnouncementById(id) 
    if(!announcement) {
        throw new Error('Announcement not found')
    }
    return announcement
}
const duplicateAnnouncement = async (id)=>{
    const existingAnnouncement = await findAllAnnouncement({id}) 

    if(existingAnnouncement.length>0) {
        throw new Error('Announcement with id "'+id+'"  already exists')
    }
    return existingAnnouncement
 
}
const createAnnouncement = async (body)=>{
   
    await duplicateAnnouncement(body.id)
 
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