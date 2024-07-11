const { authService } = require("./../services/index");
const errorCodes = require("./../constants/errorCodes.js");
const { response } = require("../utils/index");
class AuthController {
    async login(req, res) {
        try {
            const result = await authService.loginService();
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}
module.exports = new AuthController();
