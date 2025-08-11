const {
  getAllAnnouncements,
  createAnnouncement,
  editAnnouncementById,
  deleteAnnouncementById,
} = require("./announcement.service");
const router = require("express").Router();
const z = require("zod");

const announcementSchema = z.object({
  id: z.string().max(5),
  announcement: z.string(),
  status: z.number(),
});

router.get("/", async (req, res) => {
  try {
    const status = req.query.status
      ? { status: parseInt(req.query.status) }
      : null;
    const announcement = await getAllAnnouncements(status);

    return res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    // Validate request body

    const announcement = await createAnnouncement(req.body);
    return res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error");
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    body["id"] = req.params.id;
    console.log(body);
    const announcement = await editAnnouncementById(body);
    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const announcement = await deleteAnnouncementById(req.params.id);
    return res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
});
module.exports = router;
