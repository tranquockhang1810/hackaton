// Validate Email
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

// Validate Length
const validateLength = (value, length) => {
  return value.length === length;
}

const validateMinLength = (value, min) => {
  return value.length >= min;
}

const validateMaxLength = (value, max) => {
  return value.length <= max;
}

const validateBirthDate = (birthDate) => {
  const today = new Date();
  // Tách chuỗi theo định dạng DD-MM-YYYY
  const [day, month, year] = birthDate.split("-").map(Number);

  // Tạo đối tượng Date từ thông tin đã tách
  const formattedDate = new Date(year, month - 1, day);

  // Kiểm tra ngày có hợp lệ không (không lớn hơn hôm nay)
  return formattedDate <= today;
};

const validatePagination = (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) {
    return next({ status: 400, message: "Page must be a positive integer" });
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return next({ status: 400, message: "Limit must be between 1 and 100" });
  }

  next();
};

module.exports = {
  validateEmail,
  validateLength,
  validateMinLength,
  validateMaxLength,
  validateBirthDate,
  validatePagination
}