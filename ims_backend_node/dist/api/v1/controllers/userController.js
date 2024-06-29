"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticateController = void 0;
const UserService_1 = require("../services/UserService");
// export const userCreateController = async (req: Request, res: Response) => {
//     const { email } = req.body;
//     // checks if user exists
//     User.findOne({ email: email })
//         .then((existingUser) => {
//             if (existingUser) {
//                 const response: IResponse = {
//                     status: "failed",
//                     message: "Account already exists. Please login",
//                 };
//                 res.status(400).json(response);
//             } else {
//                 req.body.userId = uuidv4();
//                 const user = new User(req.body);
//                 user.save();
//                 const response: IResponse = {
//                     status: "success",
//                     message: "Registration successful",
//                 };
//                 res.status(200).json(response);
//             }
//         })
//         .catch((err: any) => {
//             const response: IResponse = {
//                 status: "failed",
//                 message: "Registration failed",
//             };
//             res.status(404).json(response);
//         });
// };
const userAuthenticateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const user = yield (0, UserService_1.fetchUser)(email || username);
        if (!user) {
            const response = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        }
        else if (user.password != password) {
            const response = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        }
        else {
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            const response = {
                status: "success",
                message: "Login successful",
                data: userWithoutPassword,
            };
            res.status(200).json(response);
        }
    }
    catch (err) {
        console.log(err);
        const response = {
            status: "failed",
            message: "internal error",
        };
        res.status(500).json(response);
    }
});
exports.userAuthenticateController = userAuthenticateController;
