import { Request, Response } from "express";
import { getUsers } from "../../services/manageUsers.service";

export default async (req: Request, res: Response) => {
    // const user = res.locals.user
    const users = await getUsers()
    res.status(200).json({
        message: "Retrive all users",
        users: [
            users
        ]
    })
}