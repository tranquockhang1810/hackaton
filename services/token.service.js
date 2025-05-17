const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const JWT_SECRET = process.env.JWT_SECRET;

class TokenService {
  static generateToken(name) {
    const _id = uuidv4();
    return jwt.sign({ _id, name }, JWT_SECRET, { expiresIn: "30d" });
  }
}

module.exports = TokenService;
