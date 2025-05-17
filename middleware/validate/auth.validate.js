const {
  validateMinLength,
  validateMaxLength
} = require("../../utils/ValidateModel");

const validateLogin = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next({ status: 400, message: "Name is required" });
  }

  if (typeof name !== "string") {
    return next({ status: 400, message: "Name must be a string" });
  }

  if (name && (!validateMinLength(name, 3) || !validateMaxLength(name, 20))) {
    return next({ status: 400, message: "Name must be between 3 and 20 characters" });
  }

  next();
};

module.exports = { validateLogin };
