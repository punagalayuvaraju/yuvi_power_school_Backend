const UserModel = require("../models/UserModel");
class AuthService {
    async loginService() {
        const data = await UserModel.find({}, { _id: 0, email: 1, password: 1 });
        return { code: 200, message: "success", data };
    }
}
module.exports = new AuthService();
