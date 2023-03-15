import { Request, Response, Router } from "express";
import { UserDto } from "../../models/manage-users/users";
import { changeUserData } from "../../services/manageUsers.service";
import UserSchema from "../../validation/manage-users/user.schema";

export default async (req: Request, res: Response) => {
    const id = req.params.id
    const body: UserDto = req.body
    const { error } = UserSchema.validate(req.body)
    if(error) {
        return res.status(401).json({
            error: error.details[0].message
        })
    }
    await changeUserData(body.email, body.name, body.surname, body.birthday, body.phone, id)

    res.status(200).json({
        message: "User info updated",
        user:{
            id: id,
            email: body.email,
            name: body.name,
            surname: body.surname,
            birthday: body.birthday,
            phone: body.phone,
            role: "admin"
        }
    })
}