const { findAllAnnouncement } = require("./announcement.repository")

const getAllAnnouncements =async ()=>{
    const announcements = await findAllAnnouncement()
    return announcements
}

module.exports = {getAllAnnouncements}