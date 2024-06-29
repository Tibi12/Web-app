import { Request, Response } from "express";
import { IResponse } from "../Interfaces/IResponse";
import { v4 as uuidv4 } from "uuid";
import { fetchUser } from "../services/UserService";

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

export const userAuthenticateController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, username, password } = req.body;

    try {
        const user = await fetchUser(email || username);

        if (!user) {
            const response: IResponse = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        } else if (user.password != password) {
            const response: IResponse = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        } else {
            const { password, ...userWithoutPassword } = user;

            const response: IResponse = {
                status: "success",
                message: "Login successful",
                data: userWithoutPassword,
            };

            res.status(200).json(response);
        }
    } catch (err) {
        console.log(err);

        const response: IResponse = {
            status: "failed",
            message: "internal error",
        };

        res.status(500).json(response);
    }
};
