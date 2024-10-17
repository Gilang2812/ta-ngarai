const { Announcement } = require("../../models/relation")

const findAllAnnouncement = async ()=>{
    const allAnnouncement = await Announcement.findAll()
    return allAnnouncement
}

module.exports = {findAllAnnouncement}