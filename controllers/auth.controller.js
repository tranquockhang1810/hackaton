const AuthService = require("../services/auth.service");
const ResponseFormatter = require("../utils/ResponseFormatter");

class AuthController {
  static async login(req, res, next) {
    try {
      const { name } = req.body;

      const { accessToken } = await AuthService.login(name);

      res.status(200).json(ResponseFormatter.success(
        { accessToken, name },
        "Login successfully",
        200
      ));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController