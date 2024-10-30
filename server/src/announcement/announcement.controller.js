const { getAllAnnouncements, createAnnouncement, editAnnouncementById, deleteAnnouncementById } = require("./announcement.service"); 
const router = require("express").Router();
const Joi = require('joi');

const announcementSchema = Joi.object({
  id: Joi.string().max(5).required(),
  announcement: Joi.string().required(),
  status: Joi.number().required(),
});

router.get("/", async (req, res) => {
  try {
    const status = req.query.status ? { status: parseInt(req.query.status) } : null;
    const announcement = await getAllAnnouncements(status);

    return res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json(error.messages || error.message || 'Internal server error');
  }
});

router.post("/", async (req, res) => {
  try {
    // Validate request body
    const { error } = announcementSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message,400);
    

    const announcement = await createAnnouncement(req.body);
    return res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json(error.messages || error.message || 'Internal server error');
  }
});

router.patch('/:id', async (req,res)=>{
  try {
    const body = req.body;
    body['id'] =req.params.id;
    console.log(body)
    const announcement = await editAnnouncementById(body)
    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

router.delete('/:id', async (req,res)=>{
  try {
    const announcement = await deleteAnnouncementById(req.params.id)
    return res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
}
)
module.exports = router;
