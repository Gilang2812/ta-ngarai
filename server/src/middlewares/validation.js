const { StatusCodes } = require("http-status-codes");

const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        console.log(errorMessages)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
};

module.exports = {validateData};
