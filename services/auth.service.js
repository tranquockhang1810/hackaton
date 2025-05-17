const TokenService = require("./token.service");

class AuthService {
  static async login(name) {
    const accessToken = TokenService.generateToken(name);

    return { accessToken };
  }
}

module.exports = AuthService