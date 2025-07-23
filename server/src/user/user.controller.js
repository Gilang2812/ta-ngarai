const router = require("express").Router();
const { handleInput } = require("../../utils/handleInput");
const {
  getAllUsers,
  createNewUser,
  deleteDetailUser,
  getUser,
} = require("./user.service");
const { adminSchema } = require("./user.validation");

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error, ");
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await getUser({ id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let data = req.body;
    handleInput(req.body, adminSchema);
    const user = await createNewUser(data);
    let response = {
      data: user,
      success: "user created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:user_id/:group_id", async (req, res, next) => {
  try {
    const data = await deleteDetailUser(req.params);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
